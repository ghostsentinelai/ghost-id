import { DEFAULT_EVENT_LIMIT } from "../../../../lib/const";
import { ComparisonSection } from "../components/ComparisonPage";

export const matomoComparisonData: ComparisonSection[] = [
  {
    title: "Ease of Use",
    features: [
      {
        name: "Simple, intuitive interface",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Single-page dashboard",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "No training required",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "One-click setup",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Beautiful modern UI",
        ghost-idValue: true,
        competitorValue: false,
      },
    ],
  },
  {
    title: "Core Analytics Features",
    features: [
      {
        name: "Web analytics dashboard",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Real-time data",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Custom events tracking",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Conversion goals",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Ecommerce tracking",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Heatmaps",
        ghost-idValue: false,
        competitorValue: true,
      },
      {
        name: "A/B testing",
        ghost-idValue: false,
        competitorValue: true,
      },
      {
        name: "Form analytics",
        ghost-idValue: false,
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
        competitorValue: true,
      },
      {
        name: "Funnels",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "User journeys (Sankey)",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "User profiles",
        ghost-idValue: true,
        competitorValue: true,
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
      {
        name: "Public dashboards",
        ghost-idValue: true,
        competitorValue: false,
      },
    ],
  },
  {
    title: "Performance & Infrastructure",
    features: [
      {
        name: "Script size",
        ghost-idValue: "18KB",
        competitorValue: "20-50KB",
      },
      {
        name: "Global CDN included",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Modern tech stack",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Auto-scaling cloud",
        ghost-idValue: true,
        competitorValue: "Self-host only",
      },
      {
        name: "Zero maintenance",
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
        competitorValue: "Optional",
      },
      // {
      //   name: "GDPR compliant by default",
      //   ghost-idValue: true,
      //   competitorValue: false,
      // },
      {
        name: "No consent banner needed",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Daily rotating salt option",
        ghost-idValue: true,
        competitorValue: false,
      },
      {
        name: "Data stored in EU",
        ghost-idValue: true,
        competitorValue: "Varies",
      },
    ],
  },
  {
    title: "Data & Hosting",
    features: [
      {
        name: "Data retention",
        ghost-idValue: "2-5+ years",
        competitorValue: "24 months (cloud)",
      },
      {
        name: "Self-hostable",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Managed cloud option",
        ghost-idValue: true,
        competitorValue: "Limited",
      },
      {
        name: "Easy Google Analytics import",
        ghost-idValue: false,
        competitorValue: "Complex",
      },
      {
        name: "Data export",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "API access",
        ghost-idValue: true,
        competitorValue: true,
      },
    ],
  },
  {
    title: "Support & Pricing",
    features: [
      {
        name: "Human customer support",
        ghost-idValue: true,
        competitorValue: "Paid only",
      },
      {
        name: "Free tier",
        ghost-idValue: DEFAULT_EVENT_LIMIT.toLocaleString() + " events",
        competitorValue: "Self-host only",
      },
      {
        name: "Cloud pricing",
        ghost-idValue: "$19-$499/mo",
        competitorValue: "€19-€450+/mo",
      },
      {
        name: "Open source",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Live demo available",
        ghost-idValue: true,
        competitorValue: true,
      },
      {
        name: "Documentation quality",
        ghost-idValue: "Modern",
        competitorValue: "Extensive but complex",
      },
    ],
  },
];
