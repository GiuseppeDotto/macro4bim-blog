import { collection, doc, getDocs, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { IPost, Post } from "./Post";

export class PostsManager {
  posts: Post[];
  tags: string[];
  isDev = window.location.origin.includes("http://localhost:");

  constructor(posts: Post[]) {
    this.posts = posts;
    this.tags = this.tagsFromPosts();
  }

  postBySlug(slug: string) {
    return this.posts.find((p) => p.slug === slug);
  }

  addPost(data: IPost) {
    let slug = data.title
      .toLowerCase()
      .replace(/[^a-z\s-+]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    if (this.posts.map((p) => p.slug).includes(slug)) {
      slug = slug + "-" + Date.now().toString(16);
    }
    const newPost = new Post(data, data.slug || slug);
    this.posts.push(newPost);
    this.tags = this.tagsFromPosts();
    this.isDev ? null : this.writeDB(newPost);
    return newPost;
  }

  private async writeDB(post: Post) {
    const docRef = doc(db, "posts", post.slug);
    const alreadyExist = (await getDoc(docRef)).exists();
    if (alreadyExist) {
      console.error(
        `POST NOT STORED IN THE DB.\nSLUG ALREADY EXISTING IN THE DATABASE: ${post.slug}`
      );
      return;
    }
    setDoc(docRef, { ...post });
  }

  publishPost(slug: string) {
    this.posts = this.posts.map((p) => (p.slug === slug ? p.changePublishAttr() : p));
  }

  removePost(slug: string) {
    this.posts = this.posts.filter((p) => p.slug !== slug);
    this.tags = this.tagsFromPosts();
  }

  tagsFromPosts() {
    return this.posts.reduce((acc: string[], post) => {
      post.tags.forEach((tag) => (acc.includes(tag) ? null : acc.push(tag)));
      return acc;
    }, []);
  }

  updatePost(updatedPost: Post) {
    this.posts = this.posts.map((post) => (post.slug === updatedPost.slug ? updatedPost : post));
    if (this.isDev) return;
    updateDoc(doc(db, "posts", updatedPost.slug), { ...updatedPost });
  }

  async fetchPosts() {
    if (this.isDev) return;

    (await getDocs(collection(db, "posts"))).docs.map((doc) => {
      const data = doc.data() as Post;
      const post = new Post(data, data.slug);

      this.posts.map((p) => p.slug).includes(post.slug)
        ? null
        : (this.posts = [...this.posts, post]);
    });
  }
}
