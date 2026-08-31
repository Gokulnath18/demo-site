/**
 * Event names this app can track. A closed union (rather than `string`) so
 * call sites get autocomplete and typo-checking instead of free-form strings.
 */
export type AnalyticsEvent =
  | "cta_clicked"
  | "pricing_card_viewed"
  | "tab_changed"
  | "accordion_toggled"
  | "nav_link_clicked"
  | "changelog_entry_viewed"
  | "chart_range_changed";

export interface TrackedEvent {
  event: AnalyticsEvent;
  props: Record<string, unknown>;
  timestamp: string;
}

/**
 * Pure event-shaping step: attaches a timestamp and normalizes `props` to an
 * object, without performing the actual "send". Kept separate from `track`
 * so it's unit-testable without touching console/network.
 */
export function buildTrackedEvent(
  event: AnalyticsEvent,
  props?: Record<string, unknown>,
): TrackedEvent {
  return {
    event,
    props: props ?? {},
    timestamp: new Date().toISOString(),
  };
}

/**
 * Mock analytics sink standing in for Segment/GTM/Mixpanel. Logs a
 * structured line in development and no-ops otherwise — there is no real
 * SDK, network call, or API key behind this.
 */
export function track(
  event: AnalyticsEvent,
  props?: Record<string, unknown>,
): void {
  const tracked = buildTrackedEvent(event, props);

  if (process.env.NODE_ENV === "development") {
    console.log(
      `[analytics] ${tracked.event}`,
      tracked.props,
      tracked.timestamp,
    );
  }
}
