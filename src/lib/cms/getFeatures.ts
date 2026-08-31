import featuresData from "./data/features.json";

/**
 * Shape of one feature-grid entry. Unlike `ChangelogEntry`, this doesn't
 * mirror a specific Ghost resource — it's evergreen marketing content
 * (capabilities, not dated posts), so the schema is trimmed to what the
 * launch page's feature grid actually renders.
 */
export interface FeatureContent {
  id: string;
  title: string;
  description: string;
}

const features = featuresData as FeatureContent[];

/** Simulated network latency, matching the pattern in `getChangelog.ts`. */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns mock feature-grid content, in authored display order, simulating
 * a call to a Content API.
 */
export async function getFeatures(): Promise<FeatureContent[]> {
  await delay(200);

  return [...features];
}
