import { useContext, useEffect, useState } from "react";
import { PostManagerContext } from "../App";
import { useParams } from "react-router";
import { Post } from "../classes/Post";
import MDXRenderer from "./MDXRenderer";
import PostEditor from "./PostEditor";
import TagsDiv from "./TagsDiv";

export default function PostPage() {
  const postManager = useContext(PostManagerContext);
  const { slug } = useParams();
  const [post, setPost] = useState<Post | undefined>();

  useEffect(() => {
    setPost(postManager.postBySlug(slug ? slug : ""));
  }, [slug]);

  if (!post) return <h1>404: page not found</h1>;

  return (
    <>
      <h1>{post.title}</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TagsDiv currentlyActive={post.tags} readOnly={true} />
        <div>
          <small>Create At:</small> <br />
          {post.createdAt.toLocaleDateString()}{" "}
        </div>
      </div>
      <hr />
      <MDXRenderer content={post.content} />
      <hr />
      <PostEditor post={post} />
    </>
  );
}
