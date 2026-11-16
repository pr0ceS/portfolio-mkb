import { withContentlayer } from "next-contentlayer";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  experimental: { mdxRs: true },
};
export default withContentlayer(nextConfig);
