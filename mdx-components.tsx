import type { MDXComponents } from "mdx/types";
import { codeToHtml } from "@/lib/shiki";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ children, ...props }) => (
      <a {...props} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    CodeBlock: async ({ language, code, ...props }) => {
      const html = await codeToHtml({ code, lang: language });

      return (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="not-prose bg-background rounded-md border border-zinc-200 p-2 text-[13px]"
          {...props}
        />
      );
    },
  };
}
