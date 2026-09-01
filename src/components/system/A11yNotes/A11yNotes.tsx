import styles from "./A11yNotes.module.css";

export interface A11yNotesProps {
  /** Whether the primitive is Base UI-backed or plain HTML/CSS. */
  implementation: string;
  /** ARIA roles/attributes the primitive relies on. */
  roles: string[];
  /** Keyboard interactions the primitive actually supports. */
  keyboard: string[];
  /** Any additional factual caveat worth calling out. */
  notes?: string;
}

// Native <details>/<summary> rather than the Tabs/Accordion primitives this
// page is itself documenting: it's already keyboard-operable (Enter/Space on
// the summary) and announced correctly by every browser/AT combination with
// no JS, so reaching for Base UI here would add a dependency this component
// doesn't need.
export function A11yNotes({
  implementation,
  roles,
  keyboard,
  notes,
}: A11yNotesProps) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>Accessibility notes</summary>
      <dl className={styles.list}>
        <dt className={styles.term}>Implementation</dt>
        <dd className={styles.description}>{implementation}</dd>

        <dt className={styles.term}>ARIA roles / attributes</dt>
        <dd className={styles.description}>{roles.join(" · ")}</dd>

        <dt className={styles.term}>Keyboard</dt>
        <dd className={styles.description}>{keyboard.join(" · ")}</dd>

        {notes && (
          <>
            <dt className={styles.term}>Notes</dt>
            <dd className={styles.description}>{notes}</dd>
          </>
        )}
      </dl>
    </details>
  );
}
