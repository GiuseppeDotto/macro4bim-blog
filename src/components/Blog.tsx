import { useContext, useState } from "react";
import "./Blog.css";
import NewPostDialog from "./NewPostDialog";
import { PostManagerContext } from "../App";
import PostCard from "./PostCard";

export default function Blog() {
  const [newPostDialog, setNewPostDialog] = useState(false);
  const postManager = useContext(PostManagerContext);

  return (
    <>
      <h1>Macro4BIM</h1>
      <h2>Blog</h2>
      <hr />
      <button onClick={() => setNewPostDialog(true)}>CREATE NEW POST</button>
      <NewPostDialog open={newPostDialog} onClose={() => setNewPostDialog(false)} />

      <div className="post-list">
        {postManager.posts.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </div>
    </>
  );
}
