import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "../styles/blog.css";
import BlogHome from "../components/blog/BlogHome";
import BlogPost from "../components/blog/BlogPost";
import { PostManagerContext } from "../App";
import { Post } from "../classes/Post";
import "../styles/blog.css";

export default function Blog() {
  const postManager = useContext(PostManagerContext);
  const [post, setPost] = useState<Post | undefined>();

  const location = useLocation();
  const urlParams = useParams();

  useEffect(() => {
    urlParams.slug
      ? setPost(postManager.posts.find((p) => p.slug === urlParams.slug))
      : setPost(undefined);
  }, [location]);

  return post ? (
    <main id="main-main">
      <BlogPost post={post} />
    </main>
  ) : (
    <main id="main-main">
      <BlogHome />
    </main>
  );
}
