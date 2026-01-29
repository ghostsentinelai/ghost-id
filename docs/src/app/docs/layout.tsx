import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { GithubInfo } from "fumadocs-ui/components/github-info";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      githubUrl="https://github.com/ghost-id-io/ghost-id"
      links={[
        {
          type: "custom",
          children: <GithubInfo owner="ghost-id-io" repo="ghost-id" className="lg:-mx-2" />,
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
