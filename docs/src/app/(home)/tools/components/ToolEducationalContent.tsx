import { toolsSource } from "@/lib/tools-source";
import { getMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";

export async function ToolEducationalContent({ toolSlug }: { toolSlug: string }) {
  const page = toolsSource.getPage([toolSlug]);

  if (!page) {
    console.error(`Tool educational content not found for slug: ${toolSlug}`);
    notFound();
  }

  const MDXContent = page.data.body;

  return <MDXContent components={getMDXComponents()} />;
}
