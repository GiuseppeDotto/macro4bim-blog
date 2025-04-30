import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function DivSpanTag({ tags }: { tags: string[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const currentTags = searchParam.getAll("tag");

  const searchByTag = (e: React.MouseEvent) => {
    const span = e.target as HTMLSpanElement;
    const tag = span.textContent as string;
    if (span.classList.contains("active")) {
      span.classList.remove("active");
      const newSearchParam = new URLSearchParams(searchParam);
      newSearchParam.delete("tag", tag);
      setSearchParam(newSearchParam);
      return;
    }
    span.classList.add("active");
    if (location.pathname.includes("/blog")) {
      const newSearchParam = new URLSearchParams(searchParam);
      newSearchParam.append("tag", tag);
      setSearchParam(newSearchParam);
    } else {
      navigate(`/blog/?tag=${tag}`);
    }
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <span
          className={`span-tag ${currentTags.includes(tag) ? "active" : ""}`}
          key={tag}
          onClick={searchByTag}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
