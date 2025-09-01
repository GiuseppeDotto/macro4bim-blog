import { useContext, useState } from "react";
import { Post } from "../classes/Post";
import MDXRenderer from "./MDXRenderer";
import "./PostEditor.css";
import { PostManagerContext } from "../App";
import TagsDiv from "./TagsDiv";
import Toggle from "./Toggle";

export default function PostEditor({ post, onChange }: { post?: Post; onChange: () => void }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [tags, setTags] = useState(post?.tags || []);
  const [published, setPublished] = useState(post?.published || false);
  const postManager = useContext(PostManagerContext);

  const updatePost = () => {
    if (!post) return;
    postManager.updatePost(post.slug, { title, content });
    onChange();
  };

  const savePost = () => {
    postManager.addPost({ title, content }, published, tags);
    onChange();
  };

  return (
    <>
      <div className="post-editor">
        <div>
          <div className="mdx-editor">
            <input
              type="text"
              className="input-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div className="mdx-preview">
            <MDXRenderer content={`# ${title}\n${content}`} />
          </div>
        </div>

        <div>
          <TagsDiv currentlyActive={tags} readOnly={false} onChange={setTags} />
          <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
            <Toggle title="Published" onChange={setPublished} startingValue={published} />
            {post ? (
              <button onClick={updatePost}>UPDATE</button>
            ) : (
              <button onClick={savePost}>SAVE</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
