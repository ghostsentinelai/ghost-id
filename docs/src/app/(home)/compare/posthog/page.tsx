import { ComparisonPage } from "../components/ComparisonPage";
import { posthogComparisonData } from "./comparison-data";
import { PostHogComparisonContent } from "./ComparisonContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GHOST ID vs PostHog: Analytics Platform Comparison 2025",
  description:
    "Compare GHOST ID and PostHog. See why GHOST ID's focused web analytics beats PostHog's complex product suite for teams wanting simplicity without sacrificing power.",
  openGraph: {
    title: "GHOST ID vs PostHog: Focused Analytics vs Feature Bloat",
    description: "PostHog does everything. GHOST ID does web analytics perfectly. Compare the approaches.",
    type: "website",
    url: "https://ghost-id.com/compare/posthog",
  },
  twitter: {
    card: "summary_large_image",
    title: "GHOST ID vs PostHog Comparison",
    description: "Focused web analytics vs all-in-one platform. Which approach fits your needs?",
  },
  alternates: {
    canonical: "https://ghost-id.com/compare/posthog",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ghost-id.com/compare/posthog",
      name: "GHOST ID vs PostHog Comparison",
      description: "Compare GHOST ID and PostHog analytics platforms",
      url: "https://ghost-id.com/compare/posthog",
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
          name: "How is GHOST ID different from PostHog?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GHOST ID focuses exclusively on web analytics with a clean, simple interface. PostHog is an all-in-one product suite with analytics, feature flags, A/B testing, and more. GHOST ID is ideal for teams who want powerful web analytics without the complexity.",
          },
        },
        {
          "@type": "Question",
          name: "Is GHOST ID simpler than PostHog?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. GHOST ID provides a single-page dashboard with all essential metrics visible at a glance. PostHog's extensive feature set requires more time to learn and configure.",
          },
        },
        {
          "@type": "Question",
          name: "Which is better for web analytics, GHOST ID or PostHog?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For pure web analytics, GHOST ID offers a more focused and streamlined experience. PostHog is better suited for teams needing a full product analytics suite with feature flags and experimentation.",
          },
        },
      ],
    },
  ],
};

export default function PostHog() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ComparisonPage
        competitorName="PostHog"
        sections={posthogComparisonData}
        comparisonContent={<PostHogComparisonContent />}
      />
    </>
  );
}
