import { BsHeart, BsHeartFill } from "react-icons/bs";

interface IHeartIcon {
  voteKey: string;
  votes: string[];
  onClick: () => void;
}

export default function HeartIcon({ voteKey, votes, onClick }: IHeartIcon) {
  return (
    <span
      style={{ cursor: "pointer", zIndex: 1, color: `${votes.length ? "red" : ""}` }}
      onClick={onClick}
    >
      {votes.includes(voteKey) ? (
        <>
          <BsHeartFill /> <sup>{votes.length}</sup>
        </>
      ) : (
        <>
          <BsHeart /> <sup>{votes.length}</sup>
        </>
      )}
    </span>
  );
}
