import { Link } from "react-router-dom";
import { Post } from "../../classes/Post";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { BsChat, BsHeart, BsEye, BsHeartFill } from "react-icons/bs";

export default function PostCard({ post }: { post: Post }) {
  const user = useContext(UserContext);
  const likeTag = user?.displayName ? user.displayName : Date.now().toString();
  const [postVotes, setPostVotes] = useState(post.metadata.votes);

  useEffect(() => {
    const fetchPost = async () => {
      await post.fetchCommentsAndMetadata();
      setPostVotes(post.metadata.votes);
    };
    fetchPost();
  }, []);

  const votePost = () => setPostVotes([...post.votePost(likeTag)]);
  return (
    <div className="post-card" onClick={() => {}}>
      <Link to={`/post/${post.slug}`}>
        <div>
          <img
            src={`${post.thumbnail}`}
            alt={`${post.thumbnail}`}
            style={{ width: "100%", objectFit: "contain", maxHeight: "250px" }}
          />
        </div>
        <div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      </Link>
      <hr style={{ margin: "0 1rem" }} />
      <div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "end", color: "grey" }}>
          <small style={{ marginRight: "auto" }}>{post.createdAt.toLocaleDateString()}</small>
          <span
            style={{ cursor: "pointer", zIndex: 1, color: `${postVotes.length ? "red" : ""}` }}
            onClick={votePost}
          >
            {postVotes.includes(likeTag) ? (
              <>
                <BsHeartFill /> <sup>{postVotes.length}</sup>
              </>
            ) : (
              <>
                <BsHeart /> <sup>{postVotes.length}</sup>
              </>
            )}
          </span>
          <span>
            <BsChat color={post.comments.length ? "dark" : ""} /> <sup>{post.comments.length}</sup>
          </span>
          <span>
            <BsEye /> <sup>{post.metadata.views}</sup>
          </span>
        </div>
      </div>
    </div>
  );
}
