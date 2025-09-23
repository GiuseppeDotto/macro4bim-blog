import { useEffect, useState } from "react";
import { Post } from "../classes/Post";
import MDXRenderer from "./MDXRenderer";
import "./PostEditor.css";
import { usePostsManager } from "../App";
import TagsDiv from "./TagsDiv";
import Toggle from "./Toggle";

export default function PostEditor({ post, onChange }: { post?: Post; onChange: () => void }) {
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [tags, setTags] = useState(post ? [...post.tags] : []);
  const [published, setPublished] = useState(post ? post.published : false);
  const [createdAt, setCreatedAt] = useState(post ? post.createdAt : new Date());
  const postManager = usePostsManager();

  useEffect(() => {
    console.log(postManager);
  }, []);

  const updatePost = () => {
    if (!post) return;
    const updatedPost = new Post(
      { ...post, title, content, tags, published, createdAt },
      post.slug
    );
    postManager.updatePost(updatedPost);
    onChange();
  };

  const savePost = () => {
    postManager.addPost({ title, content, tags, published });
    onChange();
  };

  return (
    <>
      <div className="post-editor">
        <div className="post-editor-main-canvas">
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

        <div className="post-editor-footer">
          <TagsDiv currentlyActive={tags} readOnly={false} onChange={setTags} />
          <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
            <div>
              <small>Created At:</small>
              <br />
              <input
                type="date"
                value={createdAt.toISOString().split("T")[0]}
                onChange={(e) => setCreatedAt(new Date(e.target.value))}
              />
            </div>
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
