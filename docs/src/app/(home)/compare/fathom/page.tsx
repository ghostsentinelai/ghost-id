import { ComparisonPage } from "../components/ComparisonPage";
import { fathomComparisonData } from "./comparison-data";
import { FathomComparisonContent } from "./ComparisonContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GHOST ID vs Fathom: Privacy Analytics Comparison 2025",
  description:
    "Compare GHOST ID and Fathom analytics. Both prioritize privacy, but GHOST ID offers more features like session replay, funnels, and open-source flexibility.",
  openGraph: {
    title: "GHOST ID vs Fathom: More Features, Same Privacy Focus",
    description: "Fathom is simple. GHOST ID is simple AND powerful. Compare session replay, funnels, and more.",
    type: "website",
    url: "https://ghost-id.com/compare/fathom",
  },
  twitter: {
    card: "summary_large_image",
    title: "GHOST ID vs Fathom Analytics",
    description: "Privacy-first analytics compared. See which offers more value.",
  },
  alternates: {
    canonical: "https://ghost-id.com/compare/fathom",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ghost-id.com/compare/fathom",
      name: "GHOST ID vs Fathom Comparison",
      description: "Compare GHOST ID and Fathom analytics platforms",
      url: "https://ghost-id.com/compare/fathom",
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
          name: "How does GHOST ID compare to Fathom?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both GHOST ID and Fathom are privacy-first analytics platforms. GHOST ID offers additional features like session replay, funnels, user journeys, and is fully open-source, while Fathom focuses on simplicity.",
          },
        },
        {
          "@type": "Question",
          name: "Is GHOST ID open-source unlike Fathom?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. GHOST ID is fully open-source and can be self-hosted for free. Fathom is closed-source and only available as a paid cloud service.",
          },
        },
        {
          "@type": "Question",
          name: "Which has more features, GHOST ID or Fathom?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GHOST ID offers more features including session replay, funnel analysis, user journey visualization, Web Vitals monitoring, error tracking, and public dashboards. Fathom focuses on basic pageview analytics.",
          },
        },
      ],
    },
  ],
};

export default function Fathom() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ComparisonPage
        competitorName="Fathom"
        sections={fathomComparisonData}
        comparisonContent={<FathomComparisonContent />}
      />
    </>
  );
}
