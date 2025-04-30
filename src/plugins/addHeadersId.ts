import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root } from "mdast";

export const addHeadersId: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, (node: any) => {
      if (node.type == "heading") {
        const id = String(node.children[0].value).toLowerCase().replace(/\W/g, "-");
        const data = node.data || (node.data = {});
        data.hProperties = {
          ...node.attributes,
          id: `${id}`,
        };
      }
    });
  };
};
