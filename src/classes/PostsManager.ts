import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { IPost, Post } from "./Post";

const firstPost = `
Let's kick off this new adventure! The keywords which I would like to start with are #collaboration, #computational #design #technology and, like is easily guessable by looking at the page's name, #BIM.

:::center{.image-small}

![sssmoking](https://media2.giphy.com/media/12KDk0YabBSJHy/giphy.gif)

:::

> **The goal** is to create this sort of new platform where all the professionals who are using the Macro4BIM's tools can gather more information and get in touch with each other.

This will allow to better refine and improve some existing tools as well as opening new and interesting topics that can stand as the spark which will let a new #macro born!

**The formula** can work easily: it is just about to turn on some interesting chat under the blog if you want to discuss the post's topic. Otherwise, for the off-topic, there will always be availability texting at newtopic@macro4bim.com

I am really thrilled by this M4B adventure, 
hope you are as well (or will be)!

Let's this Macro4BIM begin!!!
`;

export class PostsManager {
  posts: Post[];
  tags: string[];

  constructor(posts: Post[]) {
    this.posts = posts;
    this.tags = this.tagsFromPosts();
    this.createPlaceholderPost();
  }

  createPlaceholderPost() {
    this.addPost({ title: "Hello World!", content: firstPost });
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
    return newPost;
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
    updateDoc(doc(db, "posts", updatedPost.slug), { ...updatedPost });
  }

  async fetchPosts() {
    (await getDocs(collection(db, "posts"))).docs.map((doc) => {
      const data = doc.data() as Post;
      const post = new Post(data, data.slug);
      this.posts.map((p) => p.slug).includes(post.slug)
        ? null
        : (this.posts = [...this.posts, post]);
    });
  }
}
