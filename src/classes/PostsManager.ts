import { IPost, Post } from "./Post";

export class PostsManager {
  posts: Post[];

  constructor(posts: Post[]) {
    this.posts = posts;
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
    this.posts.push(new Post(data, slug));
  }

  removePost(slug: string) {
    this.posts = this.posts.filter((p) => p.slug !== slug);
  }
}
