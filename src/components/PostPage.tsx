import { useContext, useEffect, useRef, useState } from "react";
import { PostManagerContext } from "../App";
import { useParams } from "react-router";
import { Post } from "../classes/Post";
import MDXRenderer from "./MDXRenderer";
import PostEditor from "./PostEditor";
import TagsDiv from "./TagsDiv";
import CloseButton from "./CloseButton";
import Toggle from "./Toggle";

export default function PostPage() {
  const postManager = useContext(PostManagerContext);
  const { slug } = useParams();
  const [post, setPost] = useState<Post | undefined>();
  const dialogEditRef = useRef<HTMLDialogElement>(null);

  const triggerDialog = () => {
    const dialog = dialogEditRef.current;
    if (!dialog) return;
    dialog.open ? dialog.close() : dialog.showModal();
  };

  useEffect(() => {
    setPost(postManager.postBySlug(slug ? slug : ""));
  }, [slug]);

  if (!post) return <h1>404: page not found</h1>;

  return (
    <>
      <Toggle title="test" onChange={() => {}} />
      <h1>{post.title}</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TagsDiv currentlyActive={post.tags} readOnly={true} />
        <div>
          <small>Create At:</small> <br />
          {post.createdAt.toLocaleDateString()}{" "}
        </div>
      </div>
      <hr />
      <MDXRenderer content={post.content} />
      <hr />

      <dialog ref={dialogEditRef}>
        <PostEditor post={post} onChange={() => {}} />
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
