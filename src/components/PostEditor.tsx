import { useContext, useRef, useState } from "react";
import { Post } from "../classes/Post";
import CloseButton from "./CloseButton";
import MDXRenderer from "./MDXRenderer";
import "./PostEditor.css";
import { PostManagerContext } from "../App";

export default function PostEditor({ post }: { post: Post }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags);
  const postManager = useContext(PostManagerContext);

  const triggerDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.open ? dialog.close() : dialog.showModal();
  };

  const updatePost = () => {
    postManager.updatePost(post.slug, { title, content });
    triggerDialog();
  };

  return (
    <>
      <button onClick={triggerDialog}>EDIT</button>

      <dialog ref={dialogRef}>
        <div className="post-editor">
          <div>
            <input
              type="text"
              className="input-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div>
            <MDXRenderer content={`# ${title}\n${content}`} />
          </div>
        </div>

        <button onClick={updatePost}>UPDATE</button>
        <CloseButton onClick={triggerDialog} />
      </dialog>
    </>
  );
}
