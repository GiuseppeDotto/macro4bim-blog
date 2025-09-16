import { useNavigate } from "react-router";
import { Post } from "../classes/Post";
import { useContext } from "react";
import { UserContext } from "../App";
import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function PostCard({ post }: { post: Post }) {
  const user = useContext(UserContext);
  const navigation = useNavigate();
  return (
    <div className="post-card" onClick={() => navigation(`/post/${post.slug}`)}>
      <h3>{post.title}</h3>
      <div>
        {post.tags.map((tag) => (
          <label key={tag} className="tag-label">
            {tag}
          </label>
        ))}
      </div>
      <div>
        {post.votes.includes(user?.email || "") ? (
          <BsHeartFill color="red" />
        ) : (
          <BsHeart color="red" />
        )}
        <sup style={{ marginLeft: "2px" }}>{post.votes.length}</sup>
      </div>
    </div>
  );
}
