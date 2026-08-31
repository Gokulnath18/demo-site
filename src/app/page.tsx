import { LinkButton } from "@/components/ui/Button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.headline}>Two paths, one design system.</h1>
      <p className={styles.subhead}>
        A senior design engineer demo: a marketing launch page and the
        component library behind it, both built from the same tokens.
      </p>
      <div className={styles.actions}>
        <LinkButton href="/launch" variant="primary" size="lg">
          View the Launch Page
        </LinkButton>
        <LinkButton href="/system" variant="secondary" size="lg">
          View the Design System
        </LinkButton>
      </div>
    </main>
  );
}
