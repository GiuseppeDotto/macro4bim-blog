import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root } from "mdast";

/**
 * Plugin to transform container directives like ::: into div elements with custom classes
 */
export const remarkContainerDirective: Plugin<[], Root> = () => {
  return (tree) => {
    // First pass: find directive containers and transform them
    visit(tree, (node: any) => {
      // Check if the node is a container directive
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        // Get the directive name which will be used as a class
        const className = node.name;

        // Transform the directive into a div with the class name
        const data = node.data || (node.data = {});

        // Add hProperties for the HTML element
        data.hName = "div";
        data.hProperties = {
          ...node.attributes,
          className: `${className}`,
        };
      }
    });
  };
};
