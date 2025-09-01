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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const compileMDX = async (content: string) => {
      try {
        const mdx = await evaluate(content, {
          remarkPlugins: [remarkGfm, remarkDirective, remarkDirectiveRehype],
          rehypePlugins: [rehypeHighlight],
          ...runtime,
        });
        setMDXrender(() => mdx.default);
        setLoading(false);
      } catch (error) {
        console.error("Error compiling MDX:", error);
        if (error instanceof ErrorEvent) setError(error.message);
        setMDXrender(undefined);
      }
    };
    compileMDX(content);
  }, [content]);

  if (loading) return <div>loading...</div>;
  if (error)
    return (
      <div style={{ color: "red" }}>
        <b>ERROR:</b>
        <br />
        {error}
      </div>
    );
  return MDXrender ? <MDXrender /> : <>{content}</>;
}
