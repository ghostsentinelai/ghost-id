import { ToolPageLayout } from "../components/ToolPageLayout";
import { ToolEducationalContent } from "../components/ToolEducationalContent";
import { ConversionRateForm } from "./ConversionRateForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Conversion Rate Calculator | Optimize Your Marketing Funnel",
  description:
    "Calculate conversion rates instantly with our free calculator. Compare against industry benchmarks, identify optimization opportunities, and improve ROI across all channels.",
  openGraph: {
    title: "Free Conversion Rate Calculator",
    description:
      "Calculate and optimize your conversion rates with industry benchmarks",
    type: "website",
    url: "https://rybbit.com/tools/conversion-rate-calculator",
    siteName: "Rybbit Documentation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Conversion Rate Calculator",
    description: "Calculate your conversion rate and compare against industry benchmarks",
  },
  alternates: {
    canonical: "https://rybbit.com/tools/conversion-rate-calculator",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Conversion Rate Calculator",
      description:
        "Free conversion rate calculator to measure marketing effectiveness and compare against industry benchmarks",
      url: "https://rybbit.com/tools/conversion-rate-calculator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is conversion rate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Conversion rate is the percentage of visitors who complete a desired action, such as making a purchase or signing up. It's calculated by dividing conversions by total visitors and multiplying by 100.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate conversion rate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Conversion Rate = (Total Conversions ÷ Total Visitors) × 100. For example, if you had 10,000 visitors and 235 conversions, your conversion rate would be 2.35%.",
          },
        },
        {
          "@type": "Question",
          name: "What is a good conversion rate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A good conversion rate varies by industry and traffic source. Overall website averages are around 2.35%, e-commerce is 2.86%, SaaS is 3%, and landing pages average 4.02%. Top performers often achieve 5-10% or higher.",
          },
        },
        {
          "@type": "Question",
          name: "How can I improve my conversion rate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Improve conversion rates by optimizing page speed, clarifying your value proposition, simplifying forms, adding social proof, using clear CTAs, A/B testing elements, and improving mobile experience.",
          },
        },
      ],
    },
  ],
};


const faqs = [
  {
    question: "What is conversion rate?",
    answer:
      "Conversion rate is the percentage of visitors who complete a desired action, such as making a purchase, signing up for a newsletter, or downloading a resource. It's calculated by dividing the number of conversions by total visitors and multiplying by 100.",
  },
  {
    question: "How do I calculate conversion rate?",
    answer:
      "Conversion Rate = (Total Conversions ÷ Total Visitors) × 100. For example, if you had 10,000 visitors and 235 conversions, your conversion rate would be 2.35%.",
  },
  {
    question: "What is a good conversion rate?",
    answer:
      "A good conversion rate varies by industry and traffic source. Overall website averages are around 2.35%, e-commerce is 2.86%, SaaS is 3%, and landing pages average 4.02%. Top-performing pages often achieve 5-10% or higher. The key is to continuously improve your own baseline.",
  },
  {
    question: "How is conversion rate different from click-through rate?",
    answer: (
      <>
        Click-through rate (CTR) measures the percentage of people who click on an ad or link,
        while conversion rate measures the percentage who complete a desired action after
        clicking. CTR measures initial engagement, while conversion rate measures final
        outcomes. Calculate your{" "}
        <Link
          href="/tools/ctr-calculator"
          className="text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          CTR here
        </Link>
        .
      </>
    ),
  },
  {
    question: "How can I improve my conversion rate?",
    answer:
      "Improve conversion rates by optimizing page speed, clarifying your value proposition, simplifying forms, adding social proof (testimonials, reviews), using clear and prominent CTAs, A/B testing different elements, improving mobile experience, and removing unnecessary distractions.",
  },
  {
    question: "What's the relationship between conversion rate and cost per acquisition?",
    answer: (
      <>
        Conversion rate and CPA are inversely related. Higher conversion rates typically lead
        to lower cost per acquisition because you're converting more of your existing traffic.
        A 1% improvement in conversion rate can significantly reduce your{" "}
        <Link
          href="/tools/cost-per-acquisition-calculator"
          className="text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          cost per acquisition
        </Link>
        .
      </>
    ),
  },
];

export default function ConversionRatePage() {
  return (
    <ToolPageLayout
      toolSlug="conversion-rate-calculator"
      title="Conversion Rate Calculator"
      description="Calculate conversion rates and compare against industry benchmarks to optimize your marketing funnel and maximize ROI"
      badge="Free Tool"
      toolComponent={<ConversionRateForm />}
      educationalContent={<ToolEducationalContent toolSlug="conversion-rate-calculator" />}
      faqs={faqs}
      relatedToolsCategory="analytics"
      ctaTitle="Track conversion rates with Rybbit"
      ctaDescription="Monitor conversion rates across pages, campaigns, and channels in real-time with Rybbit's analytics platform."
      ctaEventLocation="conversion_rate_calculator_cta"
      structuredData={structuredData}
    />
  );
}
