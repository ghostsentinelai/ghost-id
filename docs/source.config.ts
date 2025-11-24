import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

// Blog collection - separate from docs
export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().date().or(z.date()),
      author: z.string().optional(),
      image: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  },
});

// Tools collection - full tool pages in MDX format
export const tools = defineDocs({
  dir: 'content/tools',
  docs: {
    schema: frontmatterSchema.extend({
      // Tool configuration
      badge: z.string().optional().default('Free Tool'),
      category: z.enum(['analytics', 'seo', 'privacy']),

      // SEO metadata
      seoTitle: z.string(),
      seoDescription: z.string(),
      canonical: z.string(),
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      twitterTitle: z.string().optional(),
      twitterDescription: z.string().optional(),

      // CTA configuration
      ctaTitle: z.string(),
      ctaDescription: z.string(),
      ctaEventLocation: z.string(),
      ctaButtonText: z.string().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig();
