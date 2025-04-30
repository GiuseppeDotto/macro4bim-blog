import { Comment } from "../../classes/Comment";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { BsPersonCircle } from "react-icons/bs";
import { Post } from "../../classes/Post";
import HeartIcon from "../common/HeartIcon";
import DeleteButton from "../common/DeleteButton";

export default function CommentDiv({ comment, post }: { comment: Comment; post: Post }) {
  const user = useContext(UserContext);
  const [voteList, setVoteList] = useState<string[]>([...comment.votes]);
  const voteTag = user?.email || Date.now().toString();
  const voteComment = () => {
    // comment.voteComment(voteTag).then((votes) => setVoteList(votes));
    comment.voteComment(voteTag);
    setVoteList(comment.votes);
  };

  const isCreator =
    comment.userName === user?.displayName || comment.userName === user?.email?.split("@")[0];

  return (
    <div className="comment-div">
      <p>
        <BsPersonCircle style={{ color: "#ddd", translate: "0 2px" }} /> <b>{comment.userName}</b>
        {comment.userName == user?.displayName}
        {isCreator ? (
          <DeleteButton onClick={() => post.removeComment(comment.id)} subject="comment" />
        ) : null}
      </p>
      <p>{comment.content}</p>
      <div>
        <small>date: {comment.createdAt.toLocaleDateString()}</small>
        <HeartIcon voteKey={voteTag} votes={voteList} onClick={voteComment} />
      </div>
    </div>
  );
}
