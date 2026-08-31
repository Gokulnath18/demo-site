# components/ui

Shared UI primitives.

- **Button, Card, Badge** — plain styled components, added in Stage 2. No
  Base UI/Radix dependency; these don't need accessible behavior beyond
  what native HTML elements already provide.
- **Tabs, Accordion, Tooltip** (Stage 3) — built on `@base-ui/react`
  (renamed from `@base-ui-components/react`; the old package is
  deprecated), since those need real accessible interaction patterns
  (roving tabindex, keyboard navigation, focus management) that are worth
  not reinventing. Styled off Base UI's data attributes (`data-active`,
  `data-panel-open`, `data-open`, `data-starting-style`/`data-ending-style`)
  rather than tracked internal state. See the rationale comment on
  `Tooltip.tsx` for why Base UI over Radix.

- **PricingCard** (Stage 6) — composed from Card + Badge + LinkButton. Lives
  here rather than in `components/launch` because it's a generic pricing-tier
  display, not launch-specific content, even though the launch page is its
  only consumer so far.

All variants/sizes/spacing here reference tokens from `styles/tokens.css`
(and `lib/tokens.ts` for JS-side values) — no hardcoded hex or px values.

Import from `src/components/ui` (the barrel in `index.ts`) rather than
reaching into individual component folders.
