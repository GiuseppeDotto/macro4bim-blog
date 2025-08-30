import { evaluate } from "@mdx-js/mdx";
import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import rehypeHighlight from "rehype-highlight";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.min.css";

export default function MDXRenderer({ content }: { content: string }) {
  const [MDXrender, setMDXrender] = useState<React.ComponentType>();

  useEffect(() => {
    const compileMDX = async (content: string) => {
      try {
        const mdx = await evaluate(content, {
          remarkPlugins: [remarkGfm, remarkDirective, remarkDirectiveRehype],
          rehypePlugins: [rehypeHighlight],
          ...runtime,
        });
        setMDXrender(() => mdx.default);
      } catch (error) {
        console.error("Error compiling MDX:", error);
        setMDXrender(undefined);
      }
    };
    compileMDX(content);
  }, [content]);

  return MDXrender ? <MDXrender /> : <>{content}</>;
}
