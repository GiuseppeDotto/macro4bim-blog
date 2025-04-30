import { Dispatch, useContext, useEffect, useState } from "react";
import { Post } from "../../classes/Post";
import { PostManagerContext } from "../../App";
import DivSpanTag from "./DivSpanTag";
import { useSearchParams } from "react-router-dom";
import { GoSearch } from "react-icons/go";

interface Props {
  postList: Post[];
  setPostListVisible: Dispatch<Post[]>;
}
export default function ResearchHeader(props: Props) {
  const postList = props.postList;
  const setPostListVisible = props.setPostListVisible;
  const postManager = useContext(PostManagerContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const filteredList = postList.filter((post) => {
      if (searchParams.getAll("tag").length === 0) {
        return post.title.toLowerCase().includes(searchText.toLowerCase());
      }
      return (
        post.tags?.some((t) => searchParams.getAll("tag").includes(t)) &&
        post.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      );
    });
    setPostListVisible(filteredList);
  }, [searchParams, searchText]);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div>
        <span style={{ marginBottom: "0.5rem", display: "block" }}>Tags:</span>
        <DivSpanTag tags={postManager.getAllTags()} />
      </div>
      <label
        htmlFor="search-by-title"
        style={{
          display: "flex",
          alignItems: "end",
          borderBottom: "1px solid lightgrey",
          height: "fit-content",
          marginTop: "auto",
          flex: "0 0 200px",
        }}
      >
        <GoSearch style={{ flex: "0 0 30px", translate: "0 -3px", color: "grey" }} />
        <input
          type="text"
          name="search-by-title"
          placeholder="search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: "100%", border: "none" }}
        />
      </label>
    </div>
  );
}
