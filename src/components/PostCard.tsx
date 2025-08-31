import { useNavigate } from "react-router";
import { Post } from "../classes/Post";

export default function PostCard({ post }: { post: Post }) {
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
    </div>
  );
}
