export interface IComment {
  author: string;
  content: string;
}

export class Comment implements IComment {
  author: string;
  content: string;

  // class specific
  id: string;
  createdAt: Date;
  modifiedAt: Date | null = null;

  constructor(data: IComment) {
    this.author = data.author;
    this.content = data.content;
    this.id = Date.now().toString(16);
    this.createdAt = new Date();
  }
}
