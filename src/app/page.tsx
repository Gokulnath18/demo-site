import Link from "next/link";
import { Button } from "@/components/ui/Button";
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
        {/* legacyBehavior + passHref: the only way to let next/link supply
           routing/prefetch behavior while Button (a pre-existing, unmodified
           component) still owns rendering the actual <a> tag and its
           variant/size styling — avoids nesting two anchors. */}
        <Link href="/launch" passHref legacyBehavior>
          <Button as="a" variant="primary" size="lg">
            View the Launch Page
          </Button>
        </Link>
        <Link href="/system" passHref legacyBehavior>
          <Button as="a" variant="secondary" size="lg">
            View the Design System
          </Button>
        </Link>
      </div>
    </main>
  );
}
