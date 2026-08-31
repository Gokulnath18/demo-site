import { HeroCta } from "./HeroCta";
import styles from "./Hero.module.css";

// Server Component: only the CTA button below needs interactivity, and
// that's isolated in `HeroCta`.
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
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
    </section>
  );
}
