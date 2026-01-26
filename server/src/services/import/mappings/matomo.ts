import { clearSelfReferrer, getAllUrlParams } from "../../tracker/utils.js";
import { getChannel } from "../../tracker/getChannel.js";
import { RybbitEvent } from "./rybbit.js";
import { z } from "zod";
import { DateTime } from "luxon";
import { deriveKeyOnlySchema } from "./utils.js";

export interface MatomoEvent {
  // Session/user identifiers
  visitorId: string;
  fingerprint: string; // Used as session_id

  // Action data (single action, not indexed)
  type: string;
  url: string;
  pageTitle: string;
  timestamp: string;

  // Referrer data
  referrerUrl: string;
  referrerType: string;

  // Browser/OS data (pre-processed by Matomo)
  browserName: string;
  browserVersion: string;
  operatingSystemName: string;
  operatingSystemVersion: string;
  deviceType: string;

  // Language and geo
  languageCode: string;
  countryCode: string;
  regionCode: string;
  city: string;
  latitude: string;
  longitude: string;
  resolution: string;
}

export class MatomoImportMapper {
  private static readonly browserMap: Record<string, string> = {
    "samsung browser": "Samsung Internet",
    chrome: "Chrome",
    "mobile chrome": "Mobile Chrome",
    firefox: "Firefox",
    "mobile firefox": "Mobile Firefox",
    safari: "Safari",
    "mobile safari": "Mobile Safari",
    edge: "Edge",
    opera: "Opera",
    "yandex browser": "Yandex",
  };

  private static readonly osMap: Record<string, string> = {
    "mac os x": "macOS",
    "mac os": "macOS",
    android: "Android",
    ios: "iOS",
    windows: "Windows",
    linux: "Linux",
    "chrome os": "Chrome OS",
  };

  private static readonly deviceMap: Record<string, string> = {
    smartphone: "Mobile",
    desktop: "Desktop",
    tablet: "Mobile",
  };

  private static normalizeBrowserName(browser: string): string {
    // Remove version numbers from browser string
    // "Samsung Browser 29.0" -> "Samsung Browser"
    const browserName = browser.replace(/\s+[\d.]+$/i, "").trim();
    const key = browserName.toLowerCase();
    return this.browserMap[key] ?? browserName;
  }

  private static normalizeOSName(os: string): string {
    // Remove version numbers from OS string
    // "Android 15.0" -> "Android"
    const osName = os.replace(/\s+[\d.]+$/i, "").trim();
    const key = osName.toLowerCase();
    return this.osMap[key] ?? osName;
  }

  private static normalizeDeviceType(deviceType: string): string {
    const key = deviceType.toLowerCase();
    return this.deviceMap[key] ?? deviceType;
  }

  private static parseUrl(url: string): { hostname: string; pathname: string; querystring: string } {
    try {
      const urlObj = new URL(url);
      return {
        hostname: urlObj.hostname,
        pathname: urlObj.pathname,
        querystring: urlObj.search,
      };
    } catch {
      return { hostname: "", pathname: "", querystring: "" };
    }
  }

  private static readonly matomoEventSchema = z.object({
    // Session/user identifiers
    visitorId: z.string().max(64),
    fingerprint: z.string().max(64),

    // Action data (single action, not indexed)
    type: z.string().max(50),
    url: z.string().max(2048),
    pageTitle: z.string().max(512),
    timestamp: z.string().regex(/^\d+$/),

    // Referrer data
    referrerUrl: z.string().max(2048),
    referrerType: z.string().max(10),

    // Browser/OS data
    browserName: z.string().max(100),
    browserVersion: z.string().max(20),
    operatingSystemName: z.string().max(100),
    operatingSystemVersion: z.string().max(20),
    deviceType: z.string().max(30),

    // Language and geo
    languageCode: z.string().max(10),
    countryCode: z
      .string()
      .regex(/^[A-Za-z]{2}$/)
      .or(z.literal(""))
      .transform(code => code.toUpperCase()),
    regionCode: z.string().max(10),
    city: z.string().max(100),
    latitude: z
      .string()
      .regex(/^-?\d+(\.\d+)?$/)
      .or(z.literal("")),
    longitude: z
      .string()
      .regex(/^-?\d+(\.\d+)?$/)
      .or(z.literal("")),
    resolution: z
      .string()
      .regex(/^\d{1,5}x\d{1,5}$/)
      .or(z.literal("")),
  });

  static readonly matomoEventKeyOnlySchema = deriveKeyOnlySchema(MatomoImportMapper.matomoEventSchema);

  static transform(events: any[], site: number, importId: string): RybbitEvent[] {
    return events.reduce<RybbitEvent[]>((acc, event) => {
      // Validate event structure
      const parsed = MatomoImportMapper.matomoEventSchema.safeParse(event);
      if (!parsed.success) {
        return acc; // Skip invalid events gracefully
      }

      const data = parsed.data;

      // Validate action has required fields
      if (!data.url || !data.timestamp) {
        return acc; // Skip incomplete events
      }

      // Parse URL components
      const { hostname, pathname, querystring } = MatomoImportMapper.parseUrl(data.url);

      // Parse screen dimensions
      const [screenWidth, screenHeight] = data.resolution
        ? data.resolution.split("x").map(d => parseInt(d, 10))
        : [0, 0];

      // Parse geo coordinates
      const lat = data.latitude ? parseFloat(data.latitude) : 0;
      const lon = data.longitude ? parseFloat(data.longitude) : 0;

      // Normalize browser/OS/device
      const browser = MatomoImportMapper.normalizeBrowserName(data.browserName);
      const os = MatomoImportMapper.normalizeOSName(data.operatingSystemName);
      const deviceType = MatomoImportMapper.normalizeDeviceType(data.deviceType);

      // Convert Unix timestamp to "yyyy-MM-dd HH:mm:ss"
      let timestamp: string;
      try {
        timestamp = DateTime.fromSeconds(parseInt(data.timestamp, 10)).toFormat("yyyy-MM-dd HH:mm:ss");
      } catch {
        return acc; // Skip event with invalid timestamp
      }

      // Build referrer URL
      const referrer = clearSelfReferrer(data.referrerUrl, hostname.replace(/^www\./, ""));

      // Use fingerprint as session ID
      const sessionId = data.fingerprint;

      // Determine event type and name based on action type
      const isPageview = data.type === "action";
      const eventType = isPageview ? "pageview" : "custom_event";
      const eventName = isPageview ? "" : data.type || "unknown";

      acc.push({
        site_id: site,
        timestamp,
        session_id: sessionId,
        user_id: data.visitorId,
        hostname,
        pathname,
        querystring: querystring,
        url_parameters: getAllUrlParams(querystring),
        page_title: data.pageTitle || "",
        referrer,
        channel: getChannel(referrer, querystring, hostname),
        browser,
        browser_version: data.browserVersion,
        operating_system: os,
        operating_system_version: data.operatingSystemVersion,
        language: data.languageCode,
        country: data.countryCode,
        region: data.regionCode,
        city: data.city,
        lat,
        lon,
        screen_width: screenWidth,
        screen_height: screenHeight,
        device_type: deviceType,
        type: eventType,
        event_name: eventName,
        props: {},
        import_id: importId,
      });

      return acc;
    }, []);
  }
}
