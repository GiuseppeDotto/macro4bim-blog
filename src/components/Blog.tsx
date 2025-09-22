import { useContext, useState } from "react";
import "./Blog.css";
import NewPostDialog from "./NewPostDialog";
import { PostManagerContext, UserContext } from "../App";
import PostCard from "./PostCard";
import { BsPencilFill } from "react-icons/bs";
import { RiGalleryView, RiListCheck2 } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Blog() {
  const [newPostDialog, setNewPostDialog] = useState(false);
  const postManager = useContext(PostManagerContext);
  const user = useContext(UserContext);
  const [displayMode, setDisplayMode] = useState<"tiles" | "details">("tiles");

  return (
    <>
      <h1>Macro4BIM</h1>
      <h2>Blog</h2>
      <p>Below is the list of all the post sorted by publish date.</p>

      <div className="display-mode">
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginRight: "auto" }}>
          <FaMagnifyingGlass color="#aaa" />
          <input type="text" placeholder="search by name..." />
        </div>
        <button
          className={displayMode === "tiles" ? "active" : ""}
          onClick={() => setDisplayMode("tiles")}
        >
          Tiles View <RiGalleryView />{" "}
        </button>
        <button
          className={displayMode === "tiles" ? "" : "active"}
          onClick={() => setDisplayMode("details")}
        >
          Details <RiListCheck2 />{" "}
        </button>
      </div>

      <div className="post-gallery">
        {postManager.posts.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </div>

      {user?.email === "macro4bim@gmail.com" ? (
        <>
          <button onClick={() => setNewPostDialog(true)} className="new-post-button">
            NEW POST <br /> <BsPencilFill />
          </button>
          <NewPostDialog open={newPostDialog} onClose={() => setNewPostDialog(false)} />
        </>
      ) : null}
    </>
  );
}
