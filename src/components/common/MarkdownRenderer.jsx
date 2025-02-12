import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import PropTypes, { element } from "prop-types";
import rehypeSanitize from "rehype-sanitize";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyToClipboard from "react-copy-to-clipboard";

const copyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    // fill="#e8eaed"
    fill="white"
    style={{ position: "absolute", color: "white", top: "5px", right: "5px" }}
  >
    <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
  </svg>
);

export default function MarkdownRenderer({ content }) {
  // const customSchema = {
  //   ...defaultSchema,
  //   tagNames: [...(defaultSchema.tagNames || []), "iframe"], // Allow iframe tags
  //   attributes: {
  //     ...defaultSchema.attributes,
  //     iframe: ["src", "width", "height", "allow", "allowfullscreen", "frameborder"], // Allow specific iframe attributes
  //   },
  // };

  return (
    <div className="md-renderer">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            let codeRepetition = Math.random().toString(16).slice(2);
            return !inline && match ? (
              <div style={{ className: "custom-blockquote", position: "relative" }}>
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  showLineNumbers
                  {...props}
                >
                  {String(children).trim()}
                </SyntaxHighlighter>
                <CopyToClipboard text={String(children)}>
                  <button
                    className="copy-btn"
                    onClick={(e) => {
                      let elem = document.getElementById(`${codeRepetition}`);
                      // let elem = elem.querySelector(`#${codeRepetition}`);
                      elem.style.color = "white";
                      setTimeout(() => {
                        elem.style.color = "transparent";
                      }, 2500);
                    }}
                  >
                    {copyIcon}
                  </button>
                </CopyToClipboard>
                <p
                  id={codeRepetition}
                  style={{
                    color: "transparent",
                    position: "absolute",
                    top: "0rem",
                    right: "2.5rem",

                    transition: "color 250ms ease-in-out",
                  }}
                >
                  copied!
                </p>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          blockquote({ node, children, ...props }) {
            if (
              typeof children[1].props.children == "string" &&
              children[1].props.children.startsWith(":::")
            ) {
              let className = children[1].props.children.replace(/:::|\s/g, "");
              return <div className={className}>{[children.slice(2)]}</div>;
            }
            return <blockquote {...props}>{children}</blockquote>;
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

MarkdownRenderer.propTypes = {
  content: PropTypes.string,
};
