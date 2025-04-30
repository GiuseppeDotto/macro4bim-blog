import { Post } from "./Post";

interface MDXfile {
  frontmatter: {
    title: string;
    description: string;
    createdAt: string | Date;
    tags: string[];
    thumbnail: string;
    votes?: number;
    views?: number;
  };
  default: () => JSX.Element;
}

export class PostManager {
  posts: Post[] = [];

  constructor() {
    this.getLocalFiles();
  }

  private getLocalFiles() {
    const localFiles: Record<string, MDXfile> = import.meta.glob("../posts/**/*.mdx", {
      eager: true,
    });
    const localRaw: any = import.meta.glob("../posts/**/*.mdx", { eager: true, query: "?raw" });
    Object.entries(localFiles)
      .reverse()
      .map(([path, file]) => {
        const slug = path
          .split("/")
          .pop()
          ?.toLowerCase()
          .replace(/.mdx/, "")
          .replace(/\W/g, "-")
          .slice(7) as string;
        const { createdAt, votes, views, ...staticData } = file.frontmatter;
        // add thumbnail if missing from frontmatter
        if (!staticData.thumbnail) {
          const textChunk = localRaw[path].default.split(".png")[0].split("\n").pop().split("(")[1];
          if (textChunk) staticData.thumbnail = textChunk + ".png";
        }
        const metadata = {
          views: views ? views : 0,
          votes: votes ? Array(votes).fill("x") : [],
        };
        const postData = {
          slug,
          ...staticData,
          createdAt: new Date(createdAt),
          content: file.default,
          metadata,
        };
        const post = new Post(postData);
        this.posts.push(post);
      });
  }

  getAllTags() {
    return this.posts.reduce((acc: string[], post) => {
      post.tags
        ? post.tags.map((tag) => {
            if (!acc.includes(tag)) acc.push(tag);
          })
        : null;
      return acc;
    }, []);
  }
}
