import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import MDXRenderer from "./MDXRenderer";
import { PostManagerContext } from "../App";
import "./NewPostDialog.css";
import CloseButton from "./CloseButton";

export default function NewPostDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const postManager = useContext(PostManagerContext);
  const [tagList, setTagList] = useState([...postManager.tags]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    open ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [open]);

  const getActiveTags = () => {
    const tagLabels = document.querySelector(".tags-row")?.querySelectorAll("label.active");
    const tags: string[] = [];
    tagLabels ? tagLabels.forEach((t) => tags.push(t.textContent)) : null;
    return tags;
  };

  const savePost = () => {
    const tags = getActiveTags();
    postManager.addPost({ title, content }, false, tags);
    onClose();
  };
  const saveAndPublish = () => {
    const tags = getActiveTags();
    postManager.addPost({ title, content }, true, tags);
    onClose();
  };

  const resetAndClose = () => {
    setTitle("");
    setContent("");
    onClose();
  };

  const addActiveClass = (e: MouseEvent) => {
    const span = e.target as HTMLSpanElement;
    span.classList.contains("active")
      ? span.classList.remove("active")
      : span.classList.add("active");
  };

  const addTag = (e: MouseEvent<HTMLButtonElement>) => {
    const input = (e.target as HTMLButtonElement).parentElement?.querySelector("input");
    if (input instanceof HTMLInputElement) {
      if (!input.value) return;
      setTagList([...tagList, input.value]);
    }
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
          <div>
            <small>Tags:</small>
            <div className="tags-row">
              {tagList.map((tag) => (
                <label key={tag} onClick={addActiveClass}>
                  {tag}
                </label>
              ))}
              <label>
                <input
                  type="text"
                  placeholder="new-tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  style={{
                    width: `${Math.max(newTag.length + 1, 7)}ch`,
                  }}
                />
                <button onClick={addTag}>+</button>
              </label>
            </div>
          </div>
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
