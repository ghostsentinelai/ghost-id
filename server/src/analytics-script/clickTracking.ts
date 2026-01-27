import { ScriptConfig, ButtonClickProperties, RageClickProperties, DeadClickProperties } from "./types.js";
import { Tracker } from "./tracking.js";

interface ClickRecord {
  x: number;
  y: number;
  timestamp: number;
}

export class ClickTrackingManager {
  private tracker: Tracker;
  private config: ScriptConfig;
  private clickHistory: ClickRecord[] = [];
  private rageClickThreshold = 3; // Minimum clicks to detect rage
  private rageClickTimeWindow = 500; // ms
  private rageClickRadiusThreshold = 30; // px
  private deadClickObserverTimeout = 100; // ms to wait for DOM changes
  private isProcessingClick = false;

  constructor(tracker: Tracker, config: ScriptConfig) {
    this.tracker = tracker;
    this.config = config;
  }

  initialize(): void {
    document.addEventListener("click", this.handleClick.bind(this), true);
  }

  private handleClick(event: MouseEvent): void {
    if (this.isProcessingClick) return;
    this.isProcessingClick = true;

    const target = event.target as HTMLElement;
    const now = Date.now();

    // Track rage clicks
    if (this.config.trackRageClicks) {
      this.trackRageClickIfDetected(event, now);
    }

    // Track button clicks
    if (this.config.trackButtonClicks && this.isButton(target)) {
      this.trackButtonClick(target);
    }

    // Track dead clicks
    if (this.config.trackDeadClicks && !this.isInteractiveElement(target)) {
      this.trackDeadClickIfDetected(target);
    }

    this.isProcessingClick = false;
  }

  private isButton(element: HTMLElement): boolean {
    // Check if element is a button
    if (element.tagName === "BUTTON") return true;
    if (element.getAttribute("role") === "button") return true;
    if (element.tagName === "INPUT") {
      const type = (element as HTMLInputElement).type?.toLowerCase();
      if (type === "submit" || type === "button") return true;
    }

    // Check parent elements up to 3 levels
    let parent = element.parentElement;
    let depth = 0;
    while (parent && depth < 3) {
      if (parent.tagName === "BUTTON") return true;
      if (parent.getAttribute("role") === "button") return true;
      parent = parent.parentElement;
      depth++;
    }

    return false;
  }

  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveTags = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "VIDEO", "AUDIO"];
    const interactiveRoles = ["button", "link", "checkbox", "radio", "tab", "menuitem", "option"];

    // Check the element itself
    if (interactiveTags.includes(element.tagName)) return true;
    if (element.hasAttribute("onclick")) return true;
    if (element.hasAttribute("tabindex")) return true;

    const role = element.getAttribute("role");
    if (role && interactiveRoles.includes(role)) return true;

    // Check if element or ancestors have click handlers (heuristic)
    if (element.style.cursor === "pointer") return true;
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.cursor === "pointer") return true;

    // Check parent elements
    let parent = element.parentElement;
    let depth = 0;
    while (parent && depth < 3) {
      if (interactiveTags.includes(parent.tagName)) return true;
      if (parent.hasAttribute("onclick")) return true;
      const parentRole = parent.getAttribute("role");
      if (parentRole && interactiveRoles.includes(parentRole)) return true;
      parent = parent.parentElement;
      depth++;
    }

    return false;
  }

  private trackButtonClick(element: HTMLElement): void {
    const buttonElement = this.findButton(element);
    if (!buttonElement) return;

    const properties: ButtonClickProperties = {
      element: buttonElement.tagName.toLowerCase(),
      text: this.getElementText(buttonElement),
    };

    this.tracker.trackButtonClick(properties);
  }

  private findButton(element: HTMLElement): HTMLElement | null {
    if (element.tagName === "BUTTON") return element;
    if (element.getAttribute("role") === "button") return element;
    if (element.tagName === "INPUT") {
      const type = (element as HTMLInputElement).type?.toLowerCase();
      if (type === "submit" || type === "button") return element;
    }

    let parent = element.parentElement;
    let depth = 0;
    while (parent && depth < 3) {
      if (parent.tagName === "BUTTON") return parent;
      if (parent.getAttribute("role") === "button") return parent;
      parent = parent.parentElement;
      depth++;
    }

    return null;
  }

  private trackRageClickIfDetected(event: MouseEvent, now: number): void {
    const { clientX: x, clientY: y } = event;

    // Add current click to history
    this.clickHistory.push({ x, y, timestamp: now });

    // Remove old clicks outside the time window
    this.clickHistory = this.clickHistory.filter(
      click => now - click.timestamp <= this.rageClickTimeWindow
    );

    // Check if we have enough clicks in a small radius
    if (this.clickHistory.length >= this.rageClickThreshold) {
      const nearbyClicks = this.clickHistory.filter(click => {
        const distance = Math.sqrt(Math.pow(click.x - x, 2) + Math.pow(click.y - y, 2));
        return distance <= this.rageClickRadiusThreshold;
      });

      if (nearbyClicks.length >= this.rageClickThreshold) {
        const target = event.target as HTMLElement;
        const properties: RageClickProperties = {
          clickCount: nearbyClicks.length,
          element: target.tagName.toLowerCase(),
          text: this.getElementText(target),
        };

        this.tracker.trackRageClick(properties);
        // Clear history after detecting rage click to prevent duplicate events
        this.clickHistory = [];
      }
    }
  }

  private trackDeadClickIfDetected(element: HTMLElement): void {
    // Use MutationObserver to detect if clicking caused any DOM changes
    let domChanged = false;

    const observer = new MutationObserver(() => {
      domChanged = true;
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    // Wait a short time to see if DOM changes
    setTimeout(() => {
      observer.disconnect();

      if (!domChanged) {
        const properties: DeadClickProperties = {
          element: element.tagName.toLowerCase(),
          text: this.getElementText(element),
        };

        this.tracker.trackDeadClick(properties);
      }
    }, this.deadClickObserverTimeout);
  }

  private getElementText(element: HTMLElement): string | undefined {
    const text = element.textContent?.trim().substring(0, 100);
    return text || undefined;
  }

  cleanup(): void {
    document.removeEventListener("click", this.handleClick.bind(this), true);
    this.clickHistory = [];
  }
}
