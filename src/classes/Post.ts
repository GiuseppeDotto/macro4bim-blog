import { Timestamp } from "firebase/firestore";
import { Comment, IComment } from "./Comment";

export interface IPost {
  title: string;
  content: string;

  slug?: string;
  createdAt?: Date | Timestamp;
  modifiedAt?: Date | Timestamp | null;
  comments?: Comment[];
  published?: boolean;
  tags?: string[];
  votes?: string[];
}

export class Post implements IPost {
  title: string;
  content: string;

  // class specific
  slug: string;
  createdAt: Date;
  modifiedAt: Date | null = null;
  comments: Comment[];
  published: boolean;
  tags: string[];
  votes: string[];

  // hooks
  onCommentAdd = () => {};

  constructor(data: IPost, slug: string) {
    this.title = data.title;
    this.content = data.content;
    this.slug = data.slug || slug;
    this.createdAt = this.convertTimestamp(data.createdAt);
    this.comments = data.comments || [];
    this.published = data.published || false;
    this.tags = data.tags || [];
    this.votes = data.votes || [];
  }

  private convertTimestamp(t: Date | Timestamp | undefined) {
    if (!t) return new Date();
    if (t instanceof Date) return t;
    return t.toDate();
  }

  changePublishAttr() {
    this.published = !this.published;
    return this;
  }

  async addComment(data: IComment) {
    const newComment = new Comment(data);
    this.comments.push(newComment);
  }

  removeComment(commentId: string) {
    this.comments = this.comments.filter((x) => x.id !== commentId);
  }

  editComment(commentId: string, newContent: string) {
    this.comments = this.comments.map((c) =>
      c.id === commentId ? { ...c, content: newContent, modifiedAt: new Date() } : c
    );
  }

  votePost(email: string) {
    this.votes.includes(email)
      ? (this.votes = this.votes.filter((x) => x !== email))
      : (this.votes = [...this.votes, email]);
  }
}
