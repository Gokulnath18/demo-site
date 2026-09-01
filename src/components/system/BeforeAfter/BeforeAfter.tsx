import { Button } from "@/components/ui/Button";
import styles from "./BeforeAfter.module.css";

// Side-by-side rather than a toggle: both states stay visible at once, so a
// reader can compare them directly without extra state/JS or an
// aria-live announcement to manage — simpler and lower-risk for a purely
// illustrative comparison than a toggle button would be.
//
// The "before" panel is an honest reconstruction, not a screenshot of a real
// commit: `git log` on Button.tsx shows it already used tokens, variants,
// and the aria-disabled/aria-busy pattern from its very first commit
// (f549ebe, Stage 2) — there is no less-refined shipped version to recreate.
// It stands in for the kind of pre-design-system button this system
// replaced, so the diff below is illustrative of what tokens buy you, not a
// literal changelog entry.
export function BeforeAfter() {
  return (
    <div className={styles.wrapper}>
      <figure className={styles.figure}>
        <div
          className={styles.beforeButton}
          role="img"
          aria-label="Illustrative earlier version of the Button: a flat blue rectangle with hardcoded colors, sharp corners, fixed pixel padding, and no visible focus ring"
        >
          <span aria-hidden="true">Get started</span>
        </div>
        <figcaption className={styles.caption}>
          <strong>Before</strong> — illustrative reconstruction of a typical
          pre-design-system button (not a real historical commit — see note
          below).
        </figcaption>
      </figure>

      <figure className={styles.figure}>
        <div className={styles.afterPreview}>
          <Button variant="primary">Get started</Button>
        </div>
        <figcaption className={styles.caption}>
          <strong>After</strong> — the live <code>Button</code> from{" "}
          <code>ui/Button</code>. Hover or tab to it.
        </figcaption>
      </figure>

      <div className={styles.diff}>
        <h3 className={styles.diffHeading}>What changed, and why</h3>
        <ul className={styles.diffList}>
          <li>
            Hardcoded hex colors and a plain system-font stack →{" "}
            <code>--color-accent</code> / <code>--color-text-on-accent</code> /{" "}
            <code>--font-family-sans</code> tokens, so the button repaints
            correctly for the dark theme automatically.
          </li>
          <li>
            Fixed pixel padding and a manually-chosen border radius →{" "}
            <code>--space-3</code>/<code>--space-4</code> and{" "}
            <code>--radius-md</code>, keeping it visually consistent with every
            other primitive on this page.
          </li>
          <li>
            No focus style and no disabled/loading affordance → a token-driven{" "}
            <code>:focus-visible</code> ring (<code>--shadow-focus</code>) plus
            the <code>aria-disabled</code>/<code>aria-busy</code> pattern that
            keeps a loading button focusable and correctly announced (see the
            accessibility notes above).
          </li>
          <li>
            A plain, single-purpose shape → a polymorphic component (
            <code>as=&quot;button&quot;</code> | <code>as=&quot;a&quot;</code>)
            sharing one visual and ARIA implementation across both element
            types.
          </li>
        </ul>
        <p className={styles.footnote}>
          Note: Button.tsx actually shipped already tokenized in Stage 2, so the
          panel above is illustrative rather than a literal diff. The one real
          refinement it underwent since then fixed a small bug — the{" "}
          <code>as</code> discriminant prop was briefly spread onto the rendered
          DOM node before being destructured out.
        </p>
      </div>
    </div>
  );
}
