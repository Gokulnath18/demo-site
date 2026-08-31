import type { PricingCardProps } from "@/components/ui/PricingCard";

// Local typed constant, not CMS-sourced: pricing is a product/business
// decision, not editorial content, so it doesn't belong behind the mock CMS
// layer the way feature copy and changelog entries do.
export const pricingTiers: PricingCardProps[] = [
  {
    name: "Starter",
    price: "$15",
    billingPeriod: "/month",
    description: "For a solo creator queuing one or two channels.",
    features: [
      "3 connected channels",
      "Unified content calendar",
      "Basic reporting",
    ],
    ctaLabel: "Start free trial",
    ctaHref: "/signup?plan=starter",
  },
  {
    name: "Team",
    price: "$49",
    billingPeriod: "/month",
    description: "For a marketing team publishing across every channel.",
    features: [
      "10 connected channels",
      "Smart send-time windows",
      "Threaded review comments",
      "CSV export",
    ],
    ctaLabel: "Start free trial",
    ctaHref: "/signup?plan=team",
    badge: "Most popular",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$99",
    billingPeriod: "/month",
    description: "For agencies managing multiple client workspaces.",
    features: [
      "Unlimited channels",
      "Multiple workspaces",
      "Priority support",
      "Custom reporting",
    ],
    ctaLabel: "Talk to sales",
    ctaHref: "/signup?plan=business",
  },
];
