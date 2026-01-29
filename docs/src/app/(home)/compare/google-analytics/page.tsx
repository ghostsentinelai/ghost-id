import { ComparisonPage } from "../components/ComparisonPage";
import { googleAnalyticsComparisonData } from "./comparison-data";
import { GoogleAnalyticsComparisonContent } from "./ComparisonContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GHOST ID vs Google Analytics: Privacy-First Alternative 2025",
  description:
    "Compare GHOST ID and Google Analytics. Discover why privacy-conscious businesses are switching from GA4 to GHOST ID's open-source, cookie-free analytics.",
  openGraph: {
    title: "GHOST ID vs Google Analytics: The Privacy-First Alternative",
    description:
      "Why thousands are switching from Google Analytics to GHOST ID. Open-source, cookie-free, GDPR compliant.",
    type: "website",
    url: "https://ghost-id.com/compare/google-analytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "GHOST ID vs Google Analytics",
    description: "The privacy-first Google Analytics alternative. Compare features side-by-side.",
  },
  alternates: {
    canonical: "https://ghost-id.com/compare/google-analytics",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ghost-id.com/compare/google-analytics",
      name: "GHOST ID vs Google Analytics Comparison",
      description: "Compare GHOST ID and Google Analytics platforms",
      url: "https://ghost-id.com/compare/google-analytics",
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
          name: "Why switch from Google Analytics to GHOST ID?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GHOST ID offers privacy-first analytics without cookies, no consent banners needed, GDPR compliance by default, and a simpler interface. Unlike GA4's complex 150+ report system, GHOST ID shows all essential metrics on a single dashboard.",
          },
        },
        {
          "@type": "Question",
          name: "Is GHOST ID GDPR compliant unlike Google Analytics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. GHOST ID is GDPR compliant by default with no cookies, no personal data collection, and EU data storage. Google Analytics has faced GDPR issues in multiple EU countries due to data transfers to the US.",
          },
        },
        {
          "@type": "Question",
          name: "Does GHOST ID offer the same features as GA4?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GHOST ID offers all essential analytics features plus session replay, funnels, user journeys, and real-time data. While GA4 has more advanced enterprise features, GHOST ID provides what most businesses actually need without the complexity.",
          },
        },
      ],
    },
  ],
};

export default function GoogleAnalytics() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ComparisonPage
        competitorName="Google Analytics"
        sections={googleAnalyticsComparisonData}
        comparisonContent={<GoogleAnalyticsComparisonContent />}
      />
    </>
  );
}
