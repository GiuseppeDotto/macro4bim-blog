import { useContext, useEffect, useRef, useState } from "react";
import MDXRenderer from "./MDXRenderer";
import { PostManagerContext } from "../App";
import "./NewPostDialog.css";

export default function NewPostDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const postManager = useContext(PostManagerContext);

  useEffect(() => {
    open ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [open]);

  const sumbitPost = () => {
    postManager.addPost({ title, content });
    onClose();
  };

  const resetAndClose = () => {
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <dialog className="new-post-dialog" ref={dialogRef}>
      <div className="new-post-div">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Post Title"
        />
        <div className="post-preview-container">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="New Post Content..."
          />
          <div className="post-preview">
            <h1>{title}</h1>
            <MDXRenderer content={content} />
          </div>
        </div>
        <button onClick={sumbitPost}>SUBMIT</button>
        <button className="close-btn" onClick={resetAndClose}>
          X
        </button>
      </div>
    </dialog>
  );
}
