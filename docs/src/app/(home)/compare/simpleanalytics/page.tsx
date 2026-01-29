import { ComparisonPage } from "../components/ComparisonPage";
import { simpleAnalyticsComparisonData } from "./comparison-data";
import { SimpleAnalyticsComparisonContent } from "./ComparisonContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GHOST ID vs Simple Analytics: Feature Comparison 2025",
  description:
    "Compare GHOST ID and Simple Analytics. Both are privacy-focused, but GHOST ID offers more advanced features like session replay, funnels, and user journeys.",
  openGraph: {
    title: "GHOST ID vs Simple Analytics: Simple AND Powerful",
    description: "Simple Analytics keeps it basic. GHOST ID adds power without complexity. Compare features.",
    type: "website",
    url: "https://ghost-id.com/compare/simpleanalytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "GHOST ID vs Simple Analytics",
    description: "Privacy-first analytics compared. See which offers the best value.",
  },
  alternates: {
    canonical: "https://ghost-id.com/compare/simpleanalytics",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ghost-id.com/compare/simpleanalytics",
      name: "GHOST ID vs Simple Analytics Comparison",
      description: "Compare GHOST ID and Simple Analytics platforms",
      url: "https://ghost-id.com/compare/simpleanalytics",
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
          name: "How does GHOST ID compare to Simple Analytics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both are privacy-first analytics platforms, but GHOST ID offers more advanced features like session replay, funnels, user journeys, and error tracking while maintaining a simple, intuitive interface.",
          },
        },
        {
          "@type": "Question",
          name: "Is GHOST ID more feature-rich than Simple Analytics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. GHOST ID includes session replay, funnel analysis, user journey visualization, Web Vitals monitoring, error tracking, and public dashboards. Simple Analytics focuses on basic metrics and simplicity.",
          },
        },
        {
          "@type": "Question",
          name: "Which is better value, GHOST ID or Simple Analytics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GHOST ID offers more features at competitive pricing, plus a generous free tier and open-source self-hosting option. Simple Analytics has fixed pricing without a free tier.",
          },
        },
      ],
    },
  ],
};

export default function SimpleAnalytics() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ComparisonPage
        competitorName="SimpleAnalytics"
        sections={simpleAnalyticsComparisonData}
        comparisonContent={<SimpleAnalyticsComparisonContent />}
      />
    </>
  );
}
