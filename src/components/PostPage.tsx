import { useContext, useEffect, useRef, useState } from "react";
import { usePostsManager, UserContext } from "../App";
import { useParams } from "react-router";
import { Post } from "../classes/Post";
import MDXRenderer from "./MDXRenderer";
import PostEditor from "./PostEditor";
import TagsDiv from "./TagsDiv";
import CloseButton from "./CloseButton";
import "./PostPage.css";
import { Comment } from "../classes/Comment";
import Heart from "./Heart";
import Eye from "./Eye";

export default function PostPage() {
  const postManager = usePostsManager();
  const user = useContext(UserContext);
  const { slug } = useParams();
  const [post, setPost] = useState<Post | undefined>();
  const dialogEditRef = useRef<HTMLDialogElement>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const triggerDialog = () => {
    const dialog = dialogEditRef.current;
    if (!dialog) return;
    dialog.open ? dialog.close() : dialog.showModal();
    setPost(postManager.postBySlug(slug || ""));
  };

  useEffect(() => {
    const postURL = postManager.postBySlug(slug ? slug : "");
    if (!postURL) return;
    setPost(postURL);
    setComments([...postURL.comments]);
    postURL.visited();
  }, [slug]);

  const addComment = () => {
    const author = user?.displayName;
    if (!author || !post) return;
    post.addComment({ author, content: newComment }).then(() => {
      setComments([...post.comments]);
    });
  };

  if (!post) return <h1>404: page not found</h1>;

  return (
    <>
      <h1>{post.title}</h1>
      <div className="post-page-header">
        <TagsDiv currentlyActive={post.tags} readOnly={true} />
        <div>
          <small>Create At:</small> <br />
          {post.createdAt.toLocaleDateString()}
        </div>
      </div>
      <hr />
      <MDXRenderer content={post.content} />
      <hr />
      <div className="post-page-footer">
        <Heart post={post} />
        <Eye post={post} />
      </div>

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
            <textarea
              placeholder="write you comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={addComment} className="btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* RESTRICTED SPACE */}
      <dialog ref={dialogEditRef}>
        <PostEditor post={post} onChange={triggerDialog} />
        <CloseButton onClick={triggerDialog} />
      </dialog>
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
