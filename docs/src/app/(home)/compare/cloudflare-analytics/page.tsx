import { ComparisonPage } from "../components/ComparisonPage";
import { cloudflareAnalyticsComparisonData } from "./comparison-data";
import { CloudflareAnalyticsComparisonContent } from "./ComparisonContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GHOST ID vs Cloudflare Analytics: Full Comparison 2025",
  description:
    "Compare GHOST ID and Cloudflare Web Analytics. While Cloudflare is free and basic, GHOST ID offers advanced features like session replay, funnels, and custom events.",
  openGraph: {
    title: "GHOST ID vs Cloudflare Analytics: Basic vs Full-Featured",
    description: "Cloudflare is free but limited. GHOST ID offers the full analytics experience. Compare features.",
    type: "website",
    url: "https://ghost-id.com/compare/cloudflare-analytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "GHOST ID vs Cloudflare Analytics",
    description: "Free basic analytics vs full-featured platform. See the difference.",
  },
  alternates: {
    canonical: "https://ghost-id.com/compare/cloudflare-analytics",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ghost-id.com/compare/cloudflare-analytics",
      name: "GHOST ID vs Cloudflare Analytics Comparison",
      description: "Compare GHOST ID and Cloudflare Web Analytics",
      url: "https://ghost-id.com/compare/cloudflare-analytics",
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
          name: "Is GHOST ID better than Cloudflare Analytics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GHOST ID offers significantly more features than Cloudflare Web Analytics including session replay, funnels, custom events, user journeys, and conversion tracking. Cloudflare is free but limited to basic pageview metrics.",
          },
        },
        {
          "@type": "Question",
          name: "What features does GHOST ID have that Cloudflare doesn't?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GHOST ID includes session replay, funnel analysis, custom event tracking, user journey visualization, Web Vitals monitoring, error tracking, goals and conversions, and public dashboards. Cloudflare only provides basic traffic metrics.",
          },
        },
        {
          "@type": "Question",
          name: "Should I switch from Cloudflare Analytics to GHOST ID?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If you need more than basic pageview data, yes. GHOST ID provides actionable insights with session replay, conversion tracking, and user behavior analysis that Cloudflare doesn't offer.",
          },
        },
      ],
    },
  ],
};

export default function CloudflareAnalytics() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ComparisonPage
        competitorName="Cloudflare Analytics"
        sections={cloudflareAnalyticsComparisonData}
        comparisonContent={<CloudflareAnalyticsComparisonContent />}
      />
    </>
  );
}
