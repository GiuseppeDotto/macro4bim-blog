import { Link } from "react-router";
import { Post } from "../classes/Post";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { BsEye, BsHeart, BsHeartFill } from "react-icons/bs";
import "./PostCard.css";

export default function PostCard({ post }: { post: Post }) {
  const user = useContext(UserContext);
  const userEmail = user?.email || "none";
  const [tagList] = useState(post.tags.join(" • "));
  const [votes, setVotes] = useState([...post.votes]);
  const [views] = useState(0);

  const vote = () => {
    post.votePost(userEmail);
    setVotes([...post.votes]);
  };

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
          <div
            className={`stats-icon ${votes.includes(userEmail) ? "red" : ""}`}
            data-count={votes.length}
            onClick={vote}
          >
            {votes.includes(userEmail) ? <BsHeartFill /> : <BsHeart />}
          </div>
          <div className="stats-icon" data-count={views}>
            <BsEye />
          </div>
        </div>
      </div>
    </div>
  );
}
