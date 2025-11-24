import { ToolPageLayout, type FAQItem } from "./ToolPageLayout";
import type { ComponentProps, ReactNode } from "react";

interface ToolPageMDXLayoutProps extends ComponentProps<"div"> {
  // These exports are required from the MDX file
  toolSlug: string;
  toolComponent: ReactNode;
  faqs: FAQItem[];
  structuredData?: object;

  // These come from frontmatter automatically
  title: string;
  description: string;
  badge?: string;
  category: "analytics" | "seo" | "privacy";
  ctaTitle: string;
  ctaDescription: string;
  ctaEventLocation: string;
  ctaButtonText?: string;
}

export default function ToolPageMDXLayout(props: ToolPageMDXLayoutProps) {
  const {
    children,
    toolSlug,
    toolComponent,
    faqs,
    structuredData,
    title,
    description,
    badge,
    category,
    ctaTitle,
    ctaDescription,
    ctaEventLocation,
    ctaButtonText,
    ...rest
  } = props;

  return (
    <ToolPageLayout
      toolSlug={toolSlug}
      title={title}
      description={description}
      badge={badge}
      toolComponent={toolComponent}
      educationalContent={children}
      faqs={faqs}
      relatedToolsCategory={category}
      ctaTitle={ctaTitle}
      ctaDescription={ctaDescription}
      ctaEventLocation={ctaEventLocation}
      ctaButtonText={ctaButtonText}
      structuredData={structuredData}
    />
  );
}
