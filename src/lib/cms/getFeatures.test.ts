import { getFeatures } from "./getFeatures";
import type { FeatureContent } from "./getFeatures";

function isFeatureContent(value: unknown): value is FeatureContent {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;

  return (
    typeof entry.id === "string" &&
    typeof entry.title === "string" &&
    typeof entry.description === "string"
  );
}

describe("getFeatures", () => {
  it("returns a realistic number of entries", async () => {
    const features = await getFeatures();
    expect(features.length).toBeGreaterThanOrEqual(3);
    expect(features.length).toBeLessThanOrEqual(4);
  });

  it("returns entries matching the FeatureContent shape", async () => {
    const features = await getFeatures();
    features.forEach((feature) => {
      expect(isFeatureContent(feature)).toBe(true);
    });
  });

  it("resolves asynchronously rather than synchronously", () => {
    let resolved = false;
    const promise = getFeatures().then((features) => {
      resolved = true;
      return features;
    });

    expect(resolved).toBe(false);
    return promise;
  });
});
