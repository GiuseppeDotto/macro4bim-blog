import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import remarkDirective from "remark-directive";
import { remarkContainerDirective } from "./src/plugins/remarkContainerDirective";
import { addHeadersId } from "./src/plugins/addHeadersId";
import rehypePrism from "rehype-prism-plus";

export default defineConfig({
  plugins: [
    nodePolyfills(),
    mdx({
      remarkPlugins: [
        remarkMdxFrontmatter,
        remarkFrontmatter,
        remarkGfm,
        remarkDirective,
        remarkContainerDirective,
        addHeadersId,
      ],
      rehypePlugins: [[rehypePrism, { ignoreMissing: true, showLineNumbers: true }]],
    }),
    react(),
  ],
});
