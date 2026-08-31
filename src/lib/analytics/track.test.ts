import { buildTrackedEvent, track } from "./track";

describe("buildTrackedEvent", () => {
  it("shapes an event with props into { event, props, timestamp }", () => {
    const tracked = buildTrackedEvent("cta_clicked", { location: "hero" });

    expect(tracked.event).toBe("cta_clicked");
    expect(tracked.props).toEqual({ location: "hero" });
    expect(typeof tracked.timestamp).toBe("string");
    expect(new Date(tracked.timestamp).toString()).not.toBe("Invalid Date");
  });

  it("shapes a different event type", () => {
    const tracked = buildTrackedEvent("tab_changed", { tab: "overview" });

    expect(tracked.event).toBe("tab_changed");
    expect(tracked.props).toEqual({ tab: "overview" });
  });

  it("defaults props to an empty object when none are passed", () => {
    const tracked = buildTrackedEvent("pricing_card_viewed");

    expect(tracked.props).toEqual({});
  });
});

describe("track", () => {
  // process.env.NODE_ENV is typed readonly; the mutable env store underneath
  // is what track() actually reads, so route writes through a loosely typed
  // alias instead of `as any`.
  const env = process.env as Record<string, string | undefined>;
  const originalEnv = env.NODE_ENV;

  afterEach(() => {
    jest.restoreAllMocks();
    env.NODE_ENV = originalEnv;
  });

  it("logs a structured line in development", () => {
    env.NODE_ENV = "development";
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    track("cta_clicked", { location: "hero" });

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toContain("cta_clicked");
  });

  it("does not log outside development", () => {
    env.NODE_ENV = "production";
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    track("cta_clicked", { location: "hero" });

    expect(logSpy).not.toHaveBeenCalled();
  });

  it("never throws even without props", () => {
    expect(() => track("pricing_card_viewed")).not.toThrow();
  });
});
