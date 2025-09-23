import { Link } from "react-router";
import { Post } from "../classes/Post";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import "./PostCard.css";
import Heart from "./Heart";

export default function PostCard({ post }: { post: Post }) {
  const [tagList] = useState(post.tags.join(" • "));
  const [views] = useState(0);

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
        <div style={{ marginRight: "10px", display: "flex", gap: "15px" }}>
          <Heart post={post} />
          <div className="stats-icon" data-count={views}>
            <BsEye />
          </div>
        </div>
      </div>
    </div>
  );
}
