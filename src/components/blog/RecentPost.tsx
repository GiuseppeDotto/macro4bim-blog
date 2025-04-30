import { useContext } from "react";
import { PostManagerContext } from "../../App";
import PostCard from "./PostCard";

export default function RecentPosts() {
  const postManager = useContext(PostManagerContext);
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        width: "calc(100% - 20px)",
        overflowX: "auto",
        padding: "10px",
      }}
    >
      {postManager.posts.slice(0, 6).map((post) => {
        return (
          <div key={post.slug} style={{ flex: "0 0 250px" }}>
            <PostCard post={post} />
          </div>
        );
      })}
    </div>
  );
}
