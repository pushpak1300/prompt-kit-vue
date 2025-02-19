import createMDX from "@next/mdx";
import * as v1 from "codehike/mdx";
import { remarkCodeHike } from "codehike/mdx";

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  syntaxHighlighting: { theme: "github-light" },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  remarkPlugins: [
    [v1.remarkCodeHike, chConfig],
    [remarkCodeHike, { theme: "github-light", lineNumbers: false }],
  ],
  recmaPlugins: [[v1.recmaCodeHike, chConfig]],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
