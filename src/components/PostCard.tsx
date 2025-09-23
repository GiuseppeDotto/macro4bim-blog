import { Link } from "react-router";
import { Post } from "../classes/Post";
import { useState } from "react";
import "./PostCard.css";
import Heart from "./Heart";
import Eye from "./Eye";

export default function PostCard({ post }: { post: Post }) {
  const [tagList] = useState(post.tags.join(" • "));

  return (
    <div className="post-card">
      <div className="card-img"></div>
      <div className="card-title-description">
        <Link to={`/post/${post.slug}`}>
          <h3>{post.title}</h3>
        </Link>
        {post.content.slice(0, 100) + "..."}
      </div>
      <div style={{ justifySelf: "end" }}>
        <small>{post.createdAt.toLocaleDateString()}</small>
      </div>
      <div className="card-footer">
        <div>
          <small>
            tags: <br />
            {tagList}
          </small>
        </div>
        <div style={{ marginRight: "10px", display: "flex", gap: "5px" }}>
          <Heart post={post} />
          <Eye post={post} />
        </div>
      </div>
    </div>
  );
}
