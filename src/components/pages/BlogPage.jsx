import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { VotesIcon, ViewsIcon } from "../common/Blog/PostShareAndMetadata";
import DateFormat from "../common/DateFormat";
import "./blogpage.css";
import { array } from "prop-types";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="card-thumbnail"></div>
      <div className="card-body">
        <h3>
          <Link to={post.slug}>{post.title}</Link>
        </h3>
        <small>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, sunt?
        </small>
        <hr />
        <div className="metadata">
          <small>
            {<DateFormat date={post.createdAt} />} <br />
            tags: {String(post.tags).replace(/,/g, " • ")}
          </small>
          <div>
            <VotesIcon votes={post.votes} />
            <ViewsIcon views={post.views} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TileView({ posts }) {
  return (
    <ul className="tile-list">
      {[...posts].reverse().map((post) => {
        return <li key={post._id}>{<PostCard post={post} />}</li>;
      })}
    </ul>
  );
}
function DetailView({ posts }) {
  return (
    <ul className="detail-list">
      {[...posts].reverse().map((post) => {
        return (
          <li key={post._id}>
            <Link to={post.slug}>
              <b>{post.title}</b>
            </Link>
            <br />
            <small>
              {<DateFormat date={post.createdAt} />} | tags:{" "}
              {String(post.tags).replace(/,/g, " • ")}
            </small>{" "}
            <br />
            <div>
              <VotesIcon votes={post.votes} />
              <ViewsIcon views={post.views} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function searchPost(text, posts, setVisiblePosts) {
  const searchingPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(text.toLowerCase())
  );
  setVisiblePosts(searchingPosts);
}

export default function BlogPage({ posts }) {
  const [listMode, setListMode] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(posts);

  return (
    <>
      <h1>Macro4BIM Blog</h1>
      <h2>Posts</h2>
      <p>
        Here is the core of Macro4BIM, where all the ideas come and are collected. Find
        below a list of the recent posts.
      </p>

      <ul className="button-list" style={{ marginLeft: "auto" }}>
        <input
          type="text"
          name="search-post"
          className="input-search"
          placeholder="search..."
          onChange={(e) => searchPost(e.target.value, posts, setVisiblePosts)}
        />
        <li
          className={listMode ? "active" : ""}
          onClick={(e) => (e.target.className == "active" ? "" : setListMode(!listMode))}
        >
          Tiles View
        </li>
        <li
          className={!listMode ? "active" : ""}
          onClick={(e) => (e.target.className == "active" ? "" : setListMode(!listMode))}
        >
          Details
        </li>
      </ul>

      {listMode ? <TileView posts={visiblePosts} /> : <DetailView posts={visiblePosts} />}
    </>
  );
}
