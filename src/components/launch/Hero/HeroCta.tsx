"use client";

import { LinkButton } from "@/components/ui/Button";
import { track } from "@/lib/analytics/track";

// The only Client Component in the Hero section: `track()` needs an event
// handler, and a handler can't be passed as a prop from the Server Component
// parent. Scoped to just this button rather than making Hero itself a
// Client Component, per the perf requirement to keep the boundary tight.
export function HeroCta() {
  return (
    <LinkButton
      href="#pricing"
      variant="primary"
      size="lg"
      onClick={() => track("cta_clicked", { location: "hero" })}
    >
      Start your free trial
    </LinkButton>
  );
}
