import { ComponentType } from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Comment, IComment } from "./Comment";

interface IPostMetadata {
  votes: string[];
  views: number;
}

interface IPost {
  slug: string;
  title: string;
  description: string;
  createdAt: Date;
  tags: string[];
  thumbnail: string;
  content: ComponentType;
  metadata: IPostMetadata;
}

export class Post implements IPost {
  slug: string;
  title: string;
  description: string;
  createdAt: Date;
  tags: string[];
  thumbnail: string;
  content: ComponentType;
  metadata: IPostMetadata;
  comments: Comment[];

  commentsRef: CollectionReference<DocumentData>;

  onCommentDelete = () => {};

  constructor(data: IPost) {
    this.slug = data.slug;
    this.title = data.title;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.tags = data.tags;
    this.thumbnail = data.thumbnail;
    this.content = data.content;
    this.metadata = data.metadata || { votes: [], views: 0 };
    this.comments = [];

    this.commentsRef = collection(db, "posts", this.slug, "comments");
  }

  async fetchCommentsAndMetadata() {
    const refDoc = doc(db, "posts", this.slug);
    const postDoc = await getDoc(refDoc);
    if (postDoc.exists()) {
      const fbData = postDoc.data() as IPostMetadata;
      this.metadata = { ...fbData };

      const q = query(collection(refDoc, "comments"), orderBy("createdAt", "desc"));
      const fbComments = await getDocs(q);
      this.comments = fbComments.docs.map((doc) => {
        return new Comment(doc.data() as IComment, doc.id);
      });
    } else {
      await setDoc(refDoc, { ...this.metadata }, { merge: true });
    }
  }

  votePost(likeTag: string) {
    if (this.metadata.votes.includes(likeTag)) {
      this.metadata.votes = this.metadata.votes.filter((x) => x !== likeTag);
    } else {
      this.metadata.votes.push(likeTag);
    }
    const postDoc = doc(db, "posts", this.slug);
    updateDoc(postDoc, { votes: [...this.metadata.votes] });
    return this.metadata.votes;
  }

  async addComment(commentData: Omit<IComment, "postSlug">) {
    const comment = new Comment({ ...commentData, postSlug: this.slug });
    const { id, ...rest } = comment;
    const newComment = await addDoc(collection(db, "posts", this.slug, "comments"), { ...rest });
    comment.id = newComment.id;
    this.comments.push(comment);
    return this.comments;
  }

  async removeComment(commentId: string) {
    const commentRef = doc(db, "posts", this.slug, "comments", commentId);
    await deleteDoc(commentRef);
    this.comments = this.comments.filter((comment) => comment.id !== commentId);
    this.onCommentDelete();
    return this.comments;
  }

  async voteComment(commentId: string, voteTag: string) {
    const commentRef = doc(db, "posts", this.slug, "comments", commentId);
    const comment = this.comments.find((c) => c.id === commentId);
    if (!comment) return;
    comment.votes.push(voteTag);
    await updateDoc(commentRef, { votes: [...comment.votes] });
    return this.comments;
  }
}
