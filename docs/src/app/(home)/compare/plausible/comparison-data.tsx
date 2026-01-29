import { DEFAULT_EVENT_LIMIT } from "../../../../lib/const";
import { ComparisonSection } from "../components/ComparisonPage";

export const plausibleComparisonData: ComparisonSection[] = [
  {
    title: "Core Analytics Features",
    features: [
      {
        name: "Simple dashboard",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Real-time data",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Visitor analytics",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Page analytics",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Source tracking",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Device/OS/Browser stats",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "UTM tracking",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Custom events",
        ghost-idValue: "With attributes",
        competitorValue: "Basic",
      },
      {
        name: "Conversion goals",
        ghost-idValue: true,
        competitorValue: true,
      },
    ],
  },
  {
    title: "Advanced Features",
    features: [
      {
        name: "Session Replay",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Funnels",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "User journeys (Sankey)",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "User profiles",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Sessions tracking",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Real-time globe view",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Web Vitals dashboard",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Error tracking",
        ghost-idValue: true,
        competitorValue: false,
      },
    ],
  },
  {
    title: "Privacy & Open Source",
    features: [
      {
        name: "Cookie-free tracking",
        ghost-idValue: true,
        competitorValue: true,
      },
      // {
      //   name: "GDPR compliant",
      //   ghost-idValue: true,
      //   competitorValue: true,
      // },
      {
        name: "No personal data collection",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Daily rotating salt option",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Open source",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Self-hostable",
        ghost-idValue: true,
        competitorValue: true,
      },
    ],
  },
  {
    title: "User Experience",
    features: [
      {
        name: "Beautiful UI",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "No training required",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Public dashboards",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Live demo",
        ghost-idValue: true,
        competitorValue: true,
      },
    ],
  },
  {
    title: "Performance & Technical",
    features: [
      {
        name: "Real-time updates",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "API access",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Tech stack",
        ghost-idValue: "Typescript/ClickHouse",
        competitorValue: "Elixir/ClickHouse",
      },
      {
        name: "Bot filtering",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Bypasses ad blockers",
        ghost-idValue: true,
        competitorValue: true,
      },
    ],
  },
  {
    title: "Data & Infrastructure",
    features: [
      {
        name: "Data retention",
        ghost-idValue: "2-5+ years",
        competitorValue: "Unlimited",
      },
      {
        name: "Data location",
        ghost-idValue: "EU (Hetzner)",
        competitorValue: "EU (Hetzner)",
      },
      {
        name: "Team collaboration",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Organization support",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Multiple websites",
        ghost-idValue: true,
        competitorValue: true,
      },
    ],
  },
  {
    title: "Pricing & Support",
    features: [
      {
        name: "Free tier",
        ghost-idValue: DEFAULT_EVENT_LIMIT.toLocaleString() + " events",
        competitorValue: false,
      },
      {
        name: "Entry price",
        ghost-idValue: "$19/mo",
        competitorValue: "$19/mo",
      },
      {
        name: "Pricing model",
        ghost-idValue: "Events-based",
        competitorValue: "Pageview-based",
      },
      {
        name: "Customer support",
        ghost-idValue: true,
        competitorValue: true,
      },
    ],
  },
];
