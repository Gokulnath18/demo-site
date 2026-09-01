import { Hero } from "@/components/launch/Hero";
import { StatPanel } from "@/components/launch/StatPanel";
import { FeatureGrid } from "@/components/launch/FeatureGrid";
import { ChangelogTimeline } from "@/components/launch/ChangelogTimeline";
import { PricingCard } from "@/components/ui/PricingCard";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/motion";
import { getChangelog, getFeatures } from "@/lib/cms";
import { pricingTiers } from "./pricingTiers";
import styles from "./page.module.css";

// Server Component: data is fetched here (mock CMS, Stage 4) and passed
// down as props, keeping FeatureGrid/ChangelogTimeline free of fetching
// concerns. No dynamic APIs (cookies/headers/searchParams) are touched
// anywhere in this tree, so the route still statically generates at build
// time despite the awaited fetches below.
//
// StatPanel is the exception to the "pass data as props" pattern — it
// fetches its own data (see its module doc) — but it's still resolved as a
// plain async call here, rather than rendered as `<StatPanel />`, so this
// page keeps working with the `await LaunchPage()` + `render()` test
// pattern used throughout this app: React DOM's test renderer can resolve
// one top-level async component per render, but not an async component
// nested inside another one's returned tree.
export default async function LaunchPage() {
  const [features, changelog, statPanel] = await Promise.all([
    getFeatures(),
    getChangelog(),
    StatPanel(),
  ]);

  return (
    <main className={styles.main}>
      <Hero />

      {statPanel}

      <FeatureGrid features={features} />

      <section
        id="pricing"
        className={styles.pricingSection}
        aria-labelledby="pricing-heading"
      >
        <h2 id="pricing-heading" className={styles.pricingHeading}>
          Simple, per-workspace pricing
        </h2>
        <ul className={styles.pricingGrid}>
          {pricingTiers.map((tier) => (
            <li key={tier.name}>
              <PricingCard {...tier} />
            </li>
          ))}
        </ul>
      </section>

      <ChangelogTimeline entries={changelog} />

      <section aria-labelledby="cta-heading">
        <Reveal className={styles.ctaBanner}>
          <h2 id="cta-heading" className={styles.ctaHeading}>
            Ready to put your queue on autopilot?
          </h2>
          <p className={styles.ctaSubhead}>
            Start a free trial — no credit card, no migration, just your
            existing channels connected in minutes.
          </p>
          <LinkButton href="/signup" variant="primary" size="lg">
            Start your free trial
          </LinkButton>
        </Reveal>
      </section>
    </main>
  );
}
