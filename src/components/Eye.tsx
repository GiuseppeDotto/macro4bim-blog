import { BsEye } from "react-icons/bs";
import { Post } from "../classes/Post";

export default function Eye({ post }: { post: Post }) {
  return (
    <div className="stats-icon" data-count={post.views || 0}>
      <BsEye />
    </div>
  );
}
