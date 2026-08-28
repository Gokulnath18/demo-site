# components/ui

Shared UI primitives.

- **Button, Card, Badge** — plain styled components, added in Stage 2. No
  Base UI/Radix dependency; these don't need accessible behavior beyond
  what native HTML elements already provide.
- **Tabs, Accordion, Tooltip** (Stage 3) will be built on Base UI, since
  those need real accessible interaction patterns (roving tabindex,
  keyboard navigation, focus management) that are worth not reinventing.

All variants/sizes/spacing here reference tokens from `styles/tokens.css`
(and `lib/tokens.ts` for JS-side values) — no hardcoded hex or px values.
