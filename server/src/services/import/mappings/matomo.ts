import { clearSelfReferrer, getAllUrlParams } from "../../tracker/utils.js";
import { getChannel } from "../../tracker/getChannel.js";
import { RybbitEvent } from "./rybbit.js";
import { z } from "zod";
import { DateTime } from "luxon";
import { deriveKeyOnlySchema } from "./utils.js";

export type MatomoEvent = z.input<typeof MatomoImportMapper.matomoEventKeyOnlySchema>;

export class MatomoImportMapper {
  private static readonly browserMap: Record<string, string> = {
    "chrome mobile": "Mobile Chrome",
    "chrome mobile ios": "Mobile Chrome",
    "chrome webview": "Chrome WebView",
    "headless chrome": "Chrome Headless",
    "firefox mobile": "Mobile Firefox",
    "firefox mobile ios": "Mobile Firefox",
    "microsoft edge": "Edge",
    "opera mobile": "Opera",
    "opera gx": "Opera GX",
    "google search app": "GSA",
    "samsung browser": "Samsung Internet",
    "yandex browser": "Yandex",
    "qq browser": "QQBrowser",
    "whale browser": "Whale",
    "mi browser": "MIUI Browser",
    "avg secure browser": "AVG Secure Browser",
  };

  private static readonly browserSchema = z
    .string()
    .max(30)
    .transform(browser => {
      const key = browser.toLowerCase();
      return MatomoImportMapper.browserMap[key] ?? browser;
    });

  private static readonly osMap: Record<string, string> = {
    mac: "macOS",
    "gnu/linux": "Linux",
    "chromium os": "Chrome OS",
    "windows mobile": "Windows Phone",
  };

  private static readonly osSchema = z
    .string()
    .max(25)
    .transform(os => {
      const key = os.toLowerCase();
      return MatomoImportMapper.osMap[key] ?? os;
    });

  private static readonly deviceMap: Record<string, string> = {
    desktop: "Desktop",
    smartphone: "Mobile",
    phablet: "Mobile",
    tablet: "Tablet",
  };

  private static readonly deviceSchema = z
    .string()
    .max(20)
    .transform(device => {
      const key = device.toLowerCase();
      return MatomoImportMapper.deviceMap[key] ?? device;
    });

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
    browserName: MatomoImportMapper.browserSchema,
    browserVersion: z.string().max(20),
    operatingSystemName: MatomoImportMapper.osSchema,
    operatingSystemVersion: z.string().max(20),
    deviceType: MatomoImportMapper.deviceSchema,

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
        browser: data.browserName,
        browser_version: data.browserVersion,
        operating_system: data.operatingSystemName,
        operating_system_version: data.operatingSystemVersion,
        language: data.languageCode,
        country: data.countryCode,
        region: data.regionCode,
        city: data.city,
        lat,
        lon,
        screen_width: screenWidth,
        screen_height: screenHeight,
        device_type: data.deviceType,
        type: eventType,
        event_name: eventName,
        props: {},
        import_id: importId,
      });

      return acc;
    }, []);
  }
}
