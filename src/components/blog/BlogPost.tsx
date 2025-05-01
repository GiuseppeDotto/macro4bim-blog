import { useContext, useState } from "react";
import { Post } from "../../classes/Post";
import HeartIcon from "../common/HeartIcon";
import CommentSection from "./CommentSection";
import DivSpanTag from "./DivSpanTag";
import { PostManagerContext, UserContext } from "../../App";
import {
  BsArrow90DegLeft,
  BsArrowLeft,
  BsArrowRight,
  BsEye,
  BsLink45Deg,
  BsLinkedin,
} from "react-icons/bs";
import { Link } from "react-router-dom";

export default function BlogPost({ post }: { post: Post }) {
  const user = useContext(UserContext);
  const voteKeys = user?.email || Date.now().toString();
  const [postVotes, setPostVotes] = useState(post.metadata.votes);
  const postManager = useContext(PostManagerContext);

  const votePost = () => {
    const newVotes = post.votePost(voteKeys);
    setPostVotes(newVotes);
  };

  const PostTopInfo = () => {
    return (
      <div id="post-data" style={{ color: "grey" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <small>Tags: </small>
          <DivSpanTag tags={post.tags} />
        </div>
        <small>Date: {post.createdAt.toLocaleDateString()}</small>
      </div>
    );
  };

  const PostMidInfo = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", color: "grey" }}>
        <div id="div-share-post">
          <small>Share:</small>
          <br />
          <div style={{ fontSize: "18pt", display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <BsLink45Deg />
            <BsLinkedin />
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
          <HeartIcon voteKey={voteKeys} votes={postVotes} onClick={votePost} />
          <span>
            <BsEye /> <sup>{post.metadata.views}</sup>
          </span>
        </div>
      </div>
    );
  };

  const PostNavigation = () => {
    const index = postManager.posts.indexOf(post);
    const previousPost = postManager.posts[index - 1];
    const nextPost = postManager.posts[index + 1];

    return (
      <nav id="post-bottom-navigation">
        {previousPost ? (
          <Link to={`/post/${previousPost.slug}`}>
            <small>previous post</small>
            <div>
              <BsArrowLeft style={{ fontSize: "1.5em" }} />
              <h3>{previousPost.title}</h3>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link to={`/post/${nextPost.slug}`}>
            <small>next post</small>
            <div>
              <h3>{nextPost.title}</h3>
              <BsArrowRight style={{ fontSize: "1.5em" }} />
            </div>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <PostTopInfo />
      <div className="post-box">
        <post.content />
      </div>
      <PostMidInfo />
      <div className="post-box">
        <CommentSection post={post} />
      </div>
      <PostNavigation />
    </div>
  );
}
