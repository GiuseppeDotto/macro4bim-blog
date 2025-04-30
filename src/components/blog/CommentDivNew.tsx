import { FormEvent, useContext } from "react";
import { UserContext } from "../../App";
import { Post } from "../../classes/Post";

export default function CommentDivNew({ post }: { post: Post }) {
  const user = useContext(UserContext);

  const submitNewComment = (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault();
    const formData = new FormData(form.target as HTMLFormElement);
    const content = formData.get("newComment") as string;
    if (!user || !user.displayName || !user.email) return console.error("CANNOT CREATE COMMENT");
    post.addComment({ userName: user.displayName, userEmail: user.email, content });
    (form.target as HTMLFormElement).reset();
  };

  return (
    <>
      <div className="new-comment">
        <h4>New Comment</h4>
        {user ? (
          <form onSubmit={submitNewComment} style={{ display: "flex", flexDirection: "column" }}>
            <textarea
              name="newComment"
              placeholder="new comment..."
              readOnly={user === null}
              style={{ resize: "none" }}
            ></textarea>
            <button type="submit" style={{ display: "block", margin: "0.5rem 0 0 auto" }}>
              Submit
            </button>
          </form>
        ) : (
          <p>
            <i>Login to add new comment.</i>
          </p>
        )}
      </div>
    </>
  );
}
