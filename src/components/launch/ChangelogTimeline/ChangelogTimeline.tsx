import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion";
import type { ChangelogEntry } from "@/lib/cms";
import styles from "./ChangelogTimeline.module.css";

export interface ChangelogTimelineProps {
  entries: ChangelogEntry[];
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

// Fetched in `launch/page.tsx` and passed down as plain props, same as
// FeatureGrid — this component does no data fetching of its own.
export function ChangelogTimeline({ entries }: ChangelogTimelineProps) {
  return (
    <section className={styles.section} aria-labelledby="changelog-heading">
      <Reveal>
        <h2 id="changelog-heading" className={styles.heading}>
          What&rsquo;s new
        </h2>
        {/* Ordered list, not a div soup: entries are inherently ordered
            (newest first), which `<ol>` communicates to assistive tech that
            a generic `<div>` list wouldn't. */}
        <ol className={styles.list}>
          {entries.map((entry) => (
            <li key={entry.id} className={styles.item}>
              {/* `dateTime` carries the machine-readable ISO timestamp while
                  the visible text stays human-readable — standard <time>
                  usage, called out here since it's the one non-obvious a11y
                  choice in this section. */}
              <time className={styles.date} dateTime={entry.published_at}>
                {dateFormatter.format(new Date(entry.published_at))}
              </time>
              <h3 className={styles.title}>{entry.title}</h3>
              <p className={styles.excerpt}>{entry.plaintext}</p>
              {entry.tags.length > 0 && (
                <ul className={styles.tags}>
                  {entry.tags.map((tag) => (
                    <li key={tag.id}>
                      <Badge variant="info">{tag.name}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
