import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Accordion } from "@/components/ui/Accordion";
import { Tooltip } from "@/components/ui/Tooltip";
import { PricingCard } from "@/components/ui/PricingCard";
import { ComponentNav } from "@/components/system/ComponentNav";
import { VariantPanel } from "@/components/system/VariantPanel";
import { A11yNotes } from "@/components/system/A11yNotes";
import { BeforeAfter } from "@/components/system/BeforeAfter";
import styles from "./page.module.css";

const NAV_ITEMS = [
  { id: "button", label: "Button" },
  { id: "card", label: "Card" },
  { id: "badge", label: "Badge" },
  { id: "tabs", label: "Tabs" },
  { id: "accordion", label: "Accordion" },
  { id: "tooltip", label: "Tooltip" },
  { id: "pricing-card", label: "PricingCard" },
  { id: "button-evolution", label: "Button: before / after" },
];

const tabsItems = [
  { value: "overview", label: "Overview", content: <p>Overview content.</p> },
  { value: "usage", label: "Usage", content: <p>Usage content.</p> },
  { value: "api", label: "API", content: <p>API content.</p> },
];

const accordionItems = [
  {
    value: "what",
    title: "What is Base UI?",
    content: "An unstyled, accessible component library for React.",
  },
  {
    value: "why",
    title: "Why not build primitives from scratch?",
    content:
      "Base UI ships the ARIA patterns, keyboard handling, and focus management already tested — this system styles it rather than re-implementing it.",
  },
];

export default function SystemPage() {
  return (
    <main className={styles.main}>
      <header className={styles.intro}>
        <h1 className={styles.headline}>Component Showcase</h1>
        <p className={styles.subhead}>
          Every primitive behind the launch page, shown live: its variants, its
          real hover/focus/disabled states, the accessibility contract it relies
          on, and — for Button — how the system around it evolved.
        </p>
      </header>

      <div className={styles.layout}>
        <ComponentNav items={NAV_ITEMS} className={styles.nav} />

        <div className={styles.sections}>
          <section
            id="button"
            aria-labelledby="button-heading"
            className={styles.section}
          >
            <h2 id="button-heading" className={styles.sectionHeading}>
              Button
            </h2>
            <p className={styles.sectionIntro}>
              Every example below is a real, interactive instance — hover or tab
              to one to see its actual hover/focus-visible state.
            </p>
            <VariantPanel
              examples={[
                {
                  label: "Primary / sm",
                  children: (
                    <Button variant="primary" size="sm">
                      Continue
                    </Button>
                  ),
                },
                {
                  label: "Primary / md",
                  children: (
                    <Button variant="primary" size="md">
                      Continue
                    </Button>
                  ),
                },
                {
                  label: "Primary / lg",
                  children: (
                    <Button variant="primary" size="lg">
                      Continue
                    </Button>
                  ),
                },
                {
                  label: "Secondary / md",
                  children: (
                    <Button variant="secondary" size="md">
                      Continue
                    </Button>
                  ),
                },
                {
                  label: "Ghost / md",
                  children: (
                    <Button variant="ghost" size="md">
                      Continue
                    </Button>
                  ),
                },
                {
                  label: "Disabled (real disabled attribute)",
                  children: (
                    <Button variant="primary" size="md" disabled>
                      Continue
                    </Button>
                  ),
                },
                {
                  label: "Loading (aria-busy, still focusable)",
                  children: (
                    <Button variant="primary" size="md" loading>
                      Continue
                    </Button>
                  ),
                },
                {
                  label: 'As anchor (as="a")',
                  children: (
                    <Button as="a" href="#button" variant="secondary" size="md">
                      Jump to top
                    </Button>
                  ),
                },
              ]}
            />
            <A11yNotes
              implementation="Plain HTML — no Base UI"
              roles={[
                "Native <button> or <a> element, chosen via the as prop",
                "aria-disabled (set while loading or disabled)",
                "aria-busy (set while loading)",
              ]}
              keyboard={[
                "Enter / Space activates a native <button>",
                "Enter activates a native <a>",
                "A loading button stays in the tab order (aria-disabled) while a disabled button is removed from it (native disabled)",
              ]}
              notes="Focus-visible ring is a token-driven :focus-visible style (--shadow-focus), not a custom focus manager."
            />
          </section>

          <section
            id="card"
            aria-labelledby="card-heading"
            className={styles.section}
          >
            <h2 id="card-heading" className={styles.sectionHeading}>
              Card
            </h2>
            <VariantPanel
              examples={[
                {
                  label: "Default",
                  children: (
                    <Card>
                      <p>Default card content.</p>
                    </Card>
                  ),
                },
                {
                  label: "Elevated",
                  children: (
                    <Card variant="elevated">
                      <p>Elevated card content.</p>
                    </Card>
                  ),
                },
              ]}
            />
            <A11yNotes
              implementation="Plain HTML — no Base UI, no ARIA role"
              roles={["None — a plain <div>"]}
              keyboard={[
                "Not interactive itself; keyboard behavior comes entirely from its children",
              ]}
            />
          </section>

          <section
            id="badge"
            aria-labelledby="badge-heading"
            className={styles.section}
          >
            <h2 id="badge-heading" className={styles.sectionHeading}>
              Badge
            </h2>
            <VariantPanel
              examples={[
                { label: "Neutral", children: <Badge>Draft</Badge> },
                {
                  label: "Success",
                  children: <Badge variant="success">Success</Badge>,
                },
                {
                  label: "Info",
                  children: <Badge variant="info">Most popular</Badge>,
                },
              ]}
            />
            <A11yNotes
              implementation="Plain HTML — no Base UI"
              roles={["Plain <span>, no ARIA role"]}
              keyboard={["Not interactive; no keyboard behavior"]}
              notes="success/info variants pair color with visible status text by convention — color alone never carries the meaning, since contrast passes WCAG AA but color perception itself isn't reliable."
            />
          </section>

          <section
            id="tabs"
            aria-labelledby="tabs-heading"
            className={styles.section}
          >
            <h2 id="tabs-heading" className={styles.sectionHeading}>
              Tabs
            </h2>
            <VariantPanel
              className={styles.wideVariantPanel}
              examples={[
                {
                  label: "Live instance (no variant/size props)",
                  children: <Tabs items={tabsItems} />,
                },
              ]}
            />
            <A11yNotes
              implementation="Base UI (@base-ui/react/tabs)"
              roles={[
                "tablist / tab / tabpanel per the WAI-ARIA Tabs pattern",
                "aria-selected on the active tab",
              ]}
              keyboard={[
                "Left/Right arrow keys move focus between tabs (roving tabindex)",
                "Home/End jump to the first/last tab",
                "Enter or Space activates the focused tab (manual activation)",
              ]}
            />
          </section>

          <section
            id="accordion"
            aria-labelledby="accordion-heading"
            className={styles.section}
          >
            <h2 id="accordion-heading" className={styles.sectionHeading}>
              Accordion
            </h2>
            <VariantPanel
              examples={[
                {
                  label: 'type="single" (default)',
                  children: <Accordion items={accordionItems} />,
                },
                {
                  label: 'type="multiple"',
                  children: (
                    <Accordion items={accordionItems} type="multiple" />
                  ),
                },
              ]}
            />
            <A11yNotes
              implementation="Base UI (@base-ui/react/accordion)"
              roles={[
                "Real <button> triggers with aria-expanded reflecting each panel's open state",
              ]}
              keyboard={[
                "Enter or Space toggles the focused trigger",
                "Tab / Shift+Tab move between triggers in document order",
              ]}
              notes='type="single" (default) closes other panels when one opens; type="multiple" allows several open at once.'
            />
          </section>

          <section
            id="tooltip"
            aria-labelledby="tooltip-heading"
            className={styles.section}
          >
            <h2 id="tooltip-heading" className={styles.sectionHeading}>
              Tooltip
            </h2>
            <VariantPanel
              examples={[
                {
                  label: "side=top",
                  children: (
                    <Tooltip content="Saves your draft" side="top" delay={0}>
                      <Button variant="secondary" size="sm">
                        Save
                      </Button>
                    </Tooltip>
                  ),
                },
                {
                  label: "side=bottom",
                  children: (
                    <Tooltip content="Saves your draft" side="bottom" delay={0}>
                      <Button variant="secondary" size="sm">
                        Save
                      </Button>
                    </Tooltip>
                  ),
                },
                {
                  label: "side=left",
                  children: (
                    <Tooltip content="Saves your draft" side="left" delay={0}>
                      <Button variant="secondary" size="sm">
                        Save
                      </Button>
                    </Tooltip>
                  ),
                },
                {
                  label: "side=right",
                  children: (
                    <Tooltip content="Saves your draft" side="right" delay={0}>
                      <Button variant="secondary" size="sm">
                        Save
                      </Button>
                    </Tooltip>
                  ),
                },
              ]}
            />
            <A11yNotes
              implementation="Base UI (@base-ui/react/tooltip)"
              roles={[
                "Popup rendered via Base UI's Positioner/Popup — visible content only, not wired to the trigger via aria-describedby",
              ]}
              keyboard={[
                "Shows on hover and on keyboard focus of the trigger",
                "Escape dismisses it",
                "Never traps or moves focus away from the trigger",
              ]}
              notes="Because the popup isn't linked via aria-describedby, the trigger must carry its own accessible name/label conveying the same info as the tooltip content — screen reader and touch users never see the popup itself."
            />
          </section>

          <section
            id="pricing-card"
            aria-labelledby="pricing-card-heading"
            className={styles.section}
          >
            <h2 id="pricing-card-heading" className={styles.sectionHeading}>
              PricingCard
            </h2>
            <VariantPanel
              className={styles.wideVariantPanel}
              examples={[
                {
                  label: "Default",
                  children: (
                    <PricingCard
                      name="Starter"
                      price="$0"
                      billingPeriod="/mo"
                      description="For trying things out."
                      features={["1 workspace", "Community support"]}
                      ctaLabel="Get started"
                      ctaHref="#pricing-card"
                    />
                  ),
                },
                {
                  label: "Highlighted, with badge",
                  children: (
                    <PricingCard
                      name="Team"
                      price="$29"
                      billingPeriod="/mo"
                      description="For growing teams."
                      features={["5 workspaces", "Priority support"]}
                      ctaLabel="Get started"
                      ctaHref="#pricing-card"
                      badge="Most popular"
                      highlighted
                    />
                  ),
                },
              ]}
            />
            <A11yNotes
              implementation="Plain HTML — composed from Card + Badge + LinkButton"
              roles={[
                "No ARIA of its own; the call-to-action renders as a real <a> (via Next's Link) rather than a button",
              ]}
              keyboard={[
                "Whatever its parts provide — the CTA link is reachable by Tab and activates on Enter like any link",
              ]}
            />
          </section>

          <section
            id="button-evolution"
            aria-labelledby="button-evolution-heading"
            className={styles.section}
          >
            <h2 id="button-evolution-heading" className={styles.sectionHeading}>
              Button: before &amp; after
            </h2>
            <BeforeAfter />
          </section>
        </div>
      </div>
    </main>
  );
}
