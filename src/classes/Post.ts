import { Comment, IComment } from "./Comment";

export interface IPost {
  title: string;
  content: string;
}

export class Post implements IPost {
  title: string;
  content: string;

  // class specific
  slug: string;
  createdAt: Date;
  modifiedAt: Date | null = null;
  comments: Comment[];

  constructor(data: IPost, slug: string) {
    this.title = data.title;
    this.content = data.content;
    this.slug = slug;
    this.createdAt = new Date();
    this.comments = [];
  }

  addComment(data: IComment) {
    this.comments.push(new Comment(data));
  }

  removeComment(commentId: string) {
    this.comments = this.comments.filter((x) => x.id !== commentId);
  }

  editComment(commentId: string, newContent: string) {
    this.comments = this.comments.map((c) =>
      c.id === commentId ? { ...c, content: newContent, modifiedAt: new Date() } : c
    );
  }
}
