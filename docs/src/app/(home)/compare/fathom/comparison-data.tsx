import { DEFAULT_EVENT_LIMIT } from "../../../../lib/const";
import { ComparisonSection } from "../components/ComparisonPage";

export const fathomComparisonData: ComparisonSection[] = [
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
        name: "Live visitor counter",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "UTM/Campaign tracking",
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
    title: "Privacy & Compliance",
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
        name: "No consent banner needed",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Daily rotating salt option",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "IP anonymization",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Data stored in EU",
        ghost-idValue: true,
        competitorValue: true,
      },
    ],
  },
  {
    title: "Open Source & Transparency",
    features: [
      {
        name: "Open source",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Self-hostable",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Code transparency",
        ghost-idValue: "Full",
        competitorValue: "None",
      },
      {
        name: "License",
        ghost-idValue: "AGPL v3",
        competitorValue: "Proprietary",
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
        name: "Public dashboards",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Email reports",
        ghost-idValue: false,
        competitorValue: true,
      },
    ],
  },
  {
    title: "Technical & Performance",
    features: [
      {
        name: "Script size",
        ghost-idValue: "18KB",
        competitorValue: "2KB",
      },
      {
        name: "Bot filtering",
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
        competitorValue: "PHP/Singlestore",
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
        competitorValue: "$15/mo",
      },
      {
        name: "Customer support",
        ghost-idValue: true,
        competitorValue: true,
      },
    ],
  },
];
