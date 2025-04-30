import { useEffect, useState } from "react";
import { Post } from "../../classes/Post";
import { Comment } from "../../classes/Comment";
import { onSnapshot } from "firebase/firestore";
import CommentDiv from "./CommentDiv";
import CommentDivNew from "./CommentDivNew";

export default function CommentSection({ post }: { post: Post }) {
  const [commentList, setCommentList] = useState<Comment[]>([...post.comments]);
  useEffect(() => {
    const fetchComments = async () => {
      await post.fetchCommentsAndMetadata();
      setCommentList([...post.comments]);
    };
    fetchComments();
  }, [post]);

  useEffect(() => {
    const unsubscribe = onSnapshot(post.commentsRef, (snapshot) => {
      if (snapshot.size === 0) return;
      const comments: Comment[] = snapshot.docs
        .sort((x) => x.data().createdAt)
        .reverse()
        .map((doc) => {
          return new Comment(doc.data() as Comment, doc.id);
        });
      setCommentList(comments);
    });
    return () => unsubscribe();
  }, []);

  post.onCommentDelete = () => setCommentList([...post.comments]);
  return (
    <>
      <div className="comment-section">
        <CommentDivNew post={post} />
        <div className="comment-list">
          <h4>Comments</h4>
          {commentList.length > 0 ? (
            commentList.map((comment) => (
              <CommentDiv post={post} comment={comment} key={comment.id} />
            ))
          ) : (
            <p>
              <i>no Comments yet for this post...</i>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
