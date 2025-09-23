import { useContext, useState } from "react";
import "./Blog.css";
import NewPostDialog from "./NewPostDialog";
import { usePostsManager, UserContext } from "../App";
import PostCard from "./PostCard";
import { BsPencilFill } from "react-icons/bs";
import { RiGalleryView, RiListCheck2 } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router";
import Heart from "./Heart";

export default function Blog() {
  const [newPostDialog, setNewPostDialog] = useState(false);
  const postManager = usePostsManager();
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

      {displayMode === "tiles" ? (
        <>
          <div className="post-gallery">
            {postManager.posts.map((post) => (
              <PostCard post={post} key={post.slug} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div>
            {postManager.posts.map((post) => {
              return (
                <div className="post-row-card" key={post.slug}>
                  <div>
                    <Link to={`/post/${post.slug}`}>
                      <h3>{post.title}</h3>
                    </Link>
                    <div>{post.content.slice(0, 100) + " (...)"}</div>
                    <div>
                      <small>{post.tags.join(" • ")}</small>
                    </div>
                  </div>
                  <div>
                    <small>{post.createdAt.toLocaleDateString()}</small>
                    <Heart post={post} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

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
