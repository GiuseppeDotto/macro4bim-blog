import { CSSProperties, useContext, useEffect, useState } from "react";
import { PostManagerContext } from "../../App";
import { Post } from "../../classes/Post";
import ResearchHeader from "./ResearchHeader";
import PostCard from "./PostCard";

export default function BlogHome() {
  const postManager = useContext(PostManagerContext);
  const [postList, setPostList] = useState([...postManager.posts]);
  const [postListVisible, setPostListVisible] = useState([...postList]);

  const [postColA, setPostColA] = useState<Post[]>(postList.filter((_, i) => i % 3 == 0));
  const [postColB, setPostColB] = useState<Post[]>(postList.filter((_, i) => i % 3 == 1));
  const [postColC, setPostColC] = useState<Post[]>(postList.filter((_, i) => i % 3 == 2));

  useEffect(() => setPostList([...postManager.posts]), [postManager.posts]);

  useEffect(() => {
    setPostColA(postListVisible.filter((_, i) => i % 3 == 0));
    setPostColB(postListVisible.filter((_, i) => i % 3 == 1));
    setPostColC(postListVisible.filter((_, i) => i % 3 == 2));
  }, [postListVisible]);

  const stackBondColStyle: CSSProperties = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  return (
    <>
      <div>
        <h1>Macro4BIM Blog</h1>
        <h2>Posts</h2>
        <p>
          Here is the core of Macro4BIM, where all the ideas come and are collected. Find below a
          list of the recent posts.
        </p>
        <ResearchHeader postList={postList} setPostListVisible={setPostListVisible} />
      </div>
      <div className="stack-bond" style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <div className="stack-bond-col" style={stackBondColStyle}>
          {postColA.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
        <div className="stack-bond-col" style={stackBondColStyle}>
          {postColB.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
        <div className="stack-bond-col" style={stackBondColStyle}>
          {postColC.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </>
  );
}
