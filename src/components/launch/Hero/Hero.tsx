import { Reveal } from "@/components/motion";
import { HeroCta } from "./HeroCta";
import styles from "./Hero.module.css";

// Server Component: only the CTA button and the `Reveal` entrance animation
// need interactivity, and both are isolated to their own Client Components
// (`HeroCta`, `Reveal`). `.hero`'s layout (flex/gap/max-width) now lives on
// `Reveal`'s wrapper div rather than the `<section>` itself, so the
// aria-labelledby landmark stays server-rendered while the content it
// labels animates in as one block.
export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <Reveal className={styles.hero}>
        <p className={styles.eyebrow}>Beacon</p>
        <h1 id="hero-heading" className={styles.headline}>
          Plan every post. Publish without watching the clock.
        </h1>
        <p className={styles.subhead}>
          Beacon queues, schedules, and publishes across every channel from one
          calendar — so your team spends less time babysitting a publish button
          and more time making things worth posting.
        </p>
        <div className={styles.actions}>
          <HeroCta />
        </div>
      </Reveal>
    </section>
  );
}
