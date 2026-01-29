import { ComparisonPage } from "../components/ComparisonPage";
import { matomoComparisonData } from "./comparison-data";
import { MatomoComparisonContent } from "./ComparisonContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GHOST ID vs Matomo: Open-Source Analytics Comparison 2025",
  description:
    "Compare GHOST ID and Matomo analytics. See how GHOST ID offers simpler setup, modern UI, privacy by default, and zero maintenance vs Matomo's complex PHP-based system.",
  openGraph: {
    title: "GHOST ID vs Matomo: Which Analytics Platform is Right for You?",
    description: "Side-by-side comparison of GHOST ID and Matomo. Modern, privacy-first analytics vs legacy PHP system.",
    type: "website",
    url: "https://ghost-id.com/compare/matomo",
  },
  twitter: {
    card: "summary_large_image",
    title: "GHOST ID vs Matomo Comparison",
    description: "Compare GHOST ID and Matomo analytics. See which open-source platform fits your needs.",
  },
  alternates: {
    canonical: "https://ghost-id.com/compare/matomo",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ghost-id.com/compare/matomo",
      name: "GHOST ID vs Matomo Comparison",
      description: "Compare GHOST ID and Matomo analytics platforms",
      url: "https://ghost-id.com/compare/matomo",
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
          name: "How does GHOST ID compare to Matomo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GHOST ID offers a modern, simpler alternative to Matomo with privacy by default, zero maintenance cloud hosting, and a beautiful single-page dashboard. While both are open-source, GHOST ID uses modern technology (Next.js, ClickHouse) vs Matomo's legacy PHP stack.",
          },
        },
        {
          "@type": "Question",
          name: "Is GHOST ID easier to use than Matomo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Matomo has 70+ reports across 12 sections, inheriting Google Analytics complexity. GHOST ID provides all essential metrics on a single dashboard with no training required.",
          },
        },
        {
          "@type": "Question",
          name: "Does GHOST ID require cookies like Matomo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. GHOST ID is cookie-free by default and requires no consent banners. Matomo uses cookies by default and requires configuration to achieve GDPR compliance.",
          },
        },
      ],
    },
  ],
};

export default function Matomo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ComparisonPage
        competitorName="Matomo"
        sections={matomoComparisonData}
        comparisonContent={<MatomoComparisonContent />}
      />
    </>
  );
}
