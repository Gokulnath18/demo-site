import styles from "./ComponentNav.module.css";

export interface ComponentNavItem {
  id: string;
  label: string;
}

export interface ComponentNavProps {
  items: ComponentNavItem[];
  className?: string;
}

// Plain anchor links rather than a client-side scroll-spy: every item is a
// real `<a href="#id">`, so Tab/Shift+Tab and Enter/Space already work via
// native anchor semantics with zero JS, and the browser's own hash
// navigation handles the jump — no IntersectionObserver bookkeeping needed
// for a nav whose only job is "get me to that section."
export function ComponentNav({ items, className }: ComponentNavProps) {
  const navClassNames = [styles.nav, className].filter(Boolean).join(" ");

  return (
    <nav aria-label="Showcased components" className={navClassNames}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <a className={styles.link} href={`#${item.id}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
