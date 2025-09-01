import { useContext, useEffect, useRef, useState } from "react";
import MDXRenderer from "./MDXRenderer";
import { PostManagerContext } from "../App";
import "./NewPostDialog.css";
import CloseButton from "./CloseButton";
import TagsDiv from "./TagsDiv";

export default function NewPostDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const postManager = useContext(PostManagerContext);
  const [tagList, setTagList] = useState<string[]>([]);

  useEffect(() => {
    open ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [open]);

  const savePost = () => {
    postManager.addPost({ title, content }, false, tagList);
    onClose();
  };
  const saveAndPublish = () => {
    postManager.addPost({ title, content }, true, tagList);
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
        <div className="post-preview-container">
          <div className="editor-div">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New Post Title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="New Post Content..."
            />
          </div>
          <div className="post-preview">
            <h1>{title}</h1>
            <MDXRenderer content={content} />
          </div>
        </div>

        <div className="new-post-last-row">
          <TagsDiv
            currentlyActive={tagList}
            readOnly={false}
            onChange={(actives) => setTagList(actives)}
          />
          <div className="button-div">
            <button onClick={savePost}>SAVE</button>
            <button onClick={saveAndPublish}>SAVE AND PUBLISH</button>
          </div>
        </div>

        <CloseButton onClick={resetAndClose} />
      </div>
    </dialog>
  );
}
