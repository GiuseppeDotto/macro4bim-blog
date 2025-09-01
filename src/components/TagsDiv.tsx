import { MouseEvent, useContext, useEffect, useState } from "react";
import { PostManagerContext } from "../App";
import "./TagDiv.css";

interface Props {
  currentlyActive: string[];
  readOnly: boolean;
  onChange?: (actives: string[]) => void;
}

export default function TagsDiv({ currentlyActive, readOnly, onChange }: Props) {
  const postManager = useContext(PostManagerContext);
  const [tags, setTags] = useState<string[]>([...postManager.tags]);
  const [actives, setActives] = useState<string[]>(currentlyActive);

  useEffect(() => {
    onChange ? onChange(actives) : null;
  }, [tags, actives]);

  const addToActive = (e: MouseEvent<HTMLSpanElement>) => {
    const span = e.target as HTMLSpanElement;
    if (!span) return;
    const tag = span.textContent;

    console.log(tag);
    actives.includes(tag)
      ? setActives(actives.filter((t) => t !== tag))
      : setActives([...actives, tag]);
  };

  const NewTag = () => {
    const [newTag, setNewTag] = useState("");

    const addNewTag = () => {
      if (tags.includes(newTag)) return;
      setTags([...tags, newTag]);
    };

    return (
      <span className="span-tag">
        <input
          type="text"
          placeholder="new-tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button onClick={addNewTag}>+</button>
      </span>
    );
  };

  if (readOnly) {
    return (
      <div>
        <small>Tags:</small>
        <div className="tags-container">
          {currentlyActive.map((tag) => (
            <span key={tag} className="span-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <small>Tags:</small>
      <div className="tags-container">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`span-tag${actives.includes(tag) ? " active" : ""}`}
            onClick={addToActive}
          >
            {tag}
          </span>
        ))}
        <NewTag />
      </div>
    </div>
  );
}
