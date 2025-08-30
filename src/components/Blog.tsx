import { useContext, useState } from "react";
import MDXRenderer from "./MDXRenderer";
import "./Blog.css";
import NewPostDialog from "./NewPostDialog";
import { PostManagerContext } from "../App";

export default function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newPostDialog, setNewPostDialog] = useState(false);
  const postManager = useContext(PostManagerContext);

  const addPost = () => {
    postManager.addPost({ title, content });
  };

  return (
    <>
      <h1>Macro4BIM</h1>
      <h2>Blog</h2>
      <hr />
      <button onClick={() => setNewPostDialog(true)}>CREATE NEW POST</button>
      <NewPostDialog open={newPostDialog} onClose={() => setNewPostDialog(false)} />

      <div className="post-list">
        {postManager.posts.map((post) => {
          return (
            <div className="post-card" key={post.slug}>
              <h2>{post.title}</h2>
              <small>{post.createdAt.toLocaleDateString()}</small>
            </div>
          );
        })}
      </div>
    </>
  );
}
