import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import Post from "../interfaces/post";
import markdownToHtml from "./markdownToHtml";

const postsDirectory = join(process.cwd(), "_posts");

export const getPostFilename = (): string[] => {
  return fs.readdirSync(postsDirectory);
};

export const getPostByFilename = (filename: string): Post => {
  const slug = filename.replace(/\.md$/, "");
  return getPostBySlug(slug);
};

export const getPostBySlug = (slug: string): Post => {
  const fullPath = join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const post: Post = {
    slug: slug,
    title: data["title"],
    raw: content,
    html: markdownToHtml(content),
    date: Date.parse(data["date"]),
    tags: data["tags"] || null,
  };

  return post;
};

export const getLastPosts = (n: number = 5): Post[] => {
  const allPosts: Post[] = getAllPosts();
  return allPosts.slice(0, n);
};

export const getAllPosts = () => {
  const filenames = getPostFilename();
  const posts: Post[] = filenames
    .filter((filename) => filename != "preview")
    .map((filename) => getPostByFilename(filename))
    .sort((a, b) => b.date - a.date);

  return posts;
};
