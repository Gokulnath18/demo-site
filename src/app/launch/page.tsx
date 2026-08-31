import { Hero } from "@/components/launch/Hero";
import { FeatureGrid } from "@/components/launch/FeatureGrid";
import { ChangelogTimeline } from "@/components/launch/ChangelogTimeline";
import { PricingCard } from "@/components/ui/PricingCard";
import { LinkButton } from "@/components/ui/Button";
import { getChangelog, getFeatures } from "@/lib/cms";
import { pricingTiers } from "./pricingTiers";
import styles from "./page.module.css";

// Server Component: data is fetched here (mock CMS, Stage 4) and passed
// down as props, keeping FeatureGrid/ChangelogTimeline free of fetching
// concerns. No dynamic APIs (cookies/headers/searchParams) are touched
// anywhere in this tree, so the route still statically generates at build
// time despite the awaited fetches below.
export default async function LaunchPage() {
  const [features, changelog] = await Promise.all([
    getFeatures(),
    getChangelog(),
  ]);

  return (
    <main className={styles.main}>
      <Hero />

      {/*
        Stage 7 slot: stat panel (Recharts). Fixed height reserves its
        space now so adding real content later doesn't shift anything
        below it (CLS).
      */}
      <div className={styles.statPanelPlaceholder} aria-hidden="true" />

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

      <section className={styles.ctaBanner} aria-labelledby="cta-heading">
        <h2 id="cta-heading" className={styles.ctaHeading}>
          Ready to put your queue on autopilot?
        </h2>
        <p className={styles.ctaSubhead}>
          Start a free trial — no credit card, no migration, just your existing
          channels connected in minutes.
        </p>
        <LinkButton href="/signup" variant="primary" size="lg">
          Start your free trial
        </LinkButton>
      </section>
    </main>
  );
}
