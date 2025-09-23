import { useContext, useState } from "react";
import { UserContext } from "../App";
import { Post } from "../classes/Post";
import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function Heart({ post }: { post: Post }) {
  const user = useContext(UserContext);
  const [votes, setVotes] = useState([...post.votes]);
  const [userEmail] = useState(user?.email || "none");

  const vote = () => {
    post.votePost(userEmail);
    setVotes([...post.votes]);
  };

  return (
    <div
      className={`stats-icon ${votes.includes(userEmail) ? "red" : ""}`}
      data-count={votes.length}
      onClick={vote}
    >
      {votes.includes(userEmail) ? <BsHeartFill /> : <BsHeart />}
    </div>
  );
}
