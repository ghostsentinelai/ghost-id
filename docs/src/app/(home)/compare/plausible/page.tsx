import { ComparisonPage } from "../components/ComparisonPage";
import { plausibleComparisonData } from "./comparison-data";
import { PlausibleComparisonContent } from "./ComparisonContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GHOST ID vs Plausible: Feature Comparison 2025",
  description:
    "Compare GHOST ID and Plausible analytics. Both are privacy-first, but GHOST ID offers more features like session replay, funnels, and user journeys at competitive pricing.",
  openGraph: {
    title: "GHOST ID vs Plausible: Which Privacy-First Analytics Wins?",
    description: "Both respect privacy, but GHOST ID offers more power. Compare session replay, funnels, and pricing.",
    type: "website",
    url: "https://ghost-id.com/compare/plausible",
  },
  twitter: {
    card: "summary_large_image",
    title: "GHOST ID vs Plausible Comparison",
    description: "Privacy-first analytics showdown. See which platform offers more value.",
  },
  alternates: {
    canonical: "https://ghost-id.com/compare/plausible",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ghost-id.com/compare/plausible",
      name: "GHOST ID vs Plausible Comparison",
      description: "Compare GHOST ID and Plausible analytics platforms",
      url: "https://ghost-id.com/compare/plausible",
      isPartOf: {
        "@type": "WebSite",
        name: "GHOST ID",
        url: "https://ghost-id.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does GHOST ID compare to Plausible?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both GHOST ID and Plausible are privacy-first analytics platforms, but GHOST ID offers more advanced features like session replay, funnels, user journeys, and error tracking while maintaining simplicity.",
          },
        },
        {
          "@type": "Question",
          name: "Does GHOST ID have features Plausible doesn't?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. GHOST ID includes session replay, funnel analysis, user journey visualization (Sankey diagrams), Web Vitals monitoring, error tracking, and public dashboards that Plausible doesn't offer.",
          },
        },
        {
          "@type": "Question",
          name: "Which is more affordable, GHOST ID or Plausible?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GHOST ID offers competitive pricing starting at $19/month for 100k events with a generous free tier. Both platforms offer similar value, but GHOST ID includes more features at each price point.",
          },
        },
      ],
    },
  ],
};

export default function Plausible() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ComparisonPage
        competitorName="Plausible"
        sections={plausibleComparisonData}
        comparisonContent={<PlausibleComparisonContent />}
      />
    </>
  );
}
