import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export interface IComment {
  userName: string;
  userEmail: string;
  content: string;
  postSlug: string;
  votes?: string[];
}

export class Comment implements IComment {
  userName: string;
  userEmail: string;
  content: string;
  postSlug: string;
  votes: string[] = [];

  id: string;
  createdAt: Date;

  constructor(data: IComment, id: string = "") {
    this.id = id;
    this.userName = data.userName;
    this.userEmail = data.userEmail;
    this.content = data.content;
    this.createdAt = new Date();
    this.postSlug = data.postSlug;
    this.votes = data.votes || [];
  }

  voteComment(tagVote: string) {
    this.votes.includes(tagVote)
      ? (this.votes = [...this.votes.filter((x) => x !== tagVote)])
      : this.votes.push(tagVote);
    // await updateDoc(doc(db, "posts", this.postSlug, "comments", this.id), {
    //   votes: [...this.votes],
    // });
    updateDoc(doc(db, "posts", this.postSlug, "comments", this.id), {
      votes: [...this.votes],
    });
    return this.votes;
  }
}
