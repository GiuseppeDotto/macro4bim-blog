import { useState } from "react";
import MDXRenderer from "./MDXRenderer";
import { PostsManager } from "../classes/PostsManager";
import "./Blog.css";

const PostManager = new PostsManager([]);

export default function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = () => {
    PostManager.addPost({ title, content });
  };

  return (
    <>
      <h1>Macro4BIM</h1>
      <h2>Blog</h2>
      <div className="new-post-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="new post title here..."
        />
        <div className="editor-preview">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="new post content here..."
          />
          <div style={{ display: "block" }}>
            <MDXRenderer content={content} />
          </div>
        </div>
      </div>
      <button onClick={addPost}>create new Post</button>
    </>
  );
}
