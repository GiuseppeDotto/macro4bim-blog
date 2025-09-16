import { useContext, useEffect, useRef, useState } from "react";
import { PostManagerContext, UserContext } from "../App";
import { useParams } from "react-router";
import { Post } from "../classes/Post";
import MDXRenderer from "./MDXRenderer";
import PostEditor from "./PostEditor";
import TagsDiv from "./TagsDiv";
import CloseButton from "./CloseButton";
import "./PostPage.css";
import { Comment } from "../classes/Comment";

export default function PostPage() {
  const postManager = useContext(PostManagerContext);
  const user = useContext(UserContext);
  const { slug } = useParams();
  const [post, setPost] = useState<Post | undefined>();
  const dialogEditRef = useRef<HTMLDialogElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const triggerDialog = () => {
    const dialog = dialogEditRef.current;
    if (!dialog) return;
    dialog.open ? dialog.close() : dialog.showModal();
  };

  useEffect(() => {
    const postURL = postManager.postBySlug(slug ? slug : "");
    if (!postURL) return;
    setPost(postURL);
    setComments([...postURL.comments]);
  }, [slug, postManager.posts]);

  const addComment = () => {
    const content = textareaRef.current?.value;
    const author = user?.displayName;
    if (!content || !author || !post) return;
    post.addComment({ author, content }).then(() => {
      setComments([...post.comments]);
    });
  };

  if (!post) return <h1>404: page not found</h1>;

  return (
    <>
      <h1>{post.title}</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TagsDiv currentlyActive={post.tags} readOnly={true} />
        <div>
          <small>Create At:</small> <br />
          {post.createdAt.toLocaleDateString()}
        </div>
      </div>
      <hr />
      <MDXRenderer content={post.content} />
      <hr />

      <dialog ref={dialogEditRef}>
        <PostEditor post={post} onChange={triggerDialog} />
        <CloseButton onClick={triggerDialog} />
      </dialog>
      <div className="comment-section">
        <h3>Comments</h3>
        <div className="comment-list">
          {comments.map((comment) => {
            return (
              <div className="comment" key={comment.id}>
                <div>
                  <h4>{comment.author}</h4>
                  <small>{comment.createdAt.toDateString()}</small>
                </div>
                <div>{comment.content}</div>
              </div>
            );
          })}
          <div className="new-comment">
            <textarea ref={textareaRef} placeholder="write you comment here..." />
            <button onClick={addComment} className="btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* RESTRICTED SPACE */}
      <button
        onClick={triggerDialog}
        style={{
          backgroundColor: "red",
          position: "fixed",
          right: "30px",
          bottom: "30px",
          fontSize: "1.5em",
          color: "yellow",
        }}
      >
        EDIT POST
      </button>
    </>
  );
}
