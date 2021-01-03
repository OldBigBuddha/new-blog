import * as fs from "fs";
const fsPromise = fs.promises;

import { join } from "path";

import matter from "gray-matter";

type Post = {
  slug: string;
  title: string;
  date: number;
};

const postDirPath = join(process.cwd(), "_posts");
const outputPostDirPath = join(process.cwd(), "out/posts");

export const getPost = async (slug: string) => {
  const fullPath = join(postDirPath, `${slug}.md`);
  const fileContents = await fsPromise.readFile(fullPath, "utf8");
  const { data } = matter(fileContents);

  const post: Post = {
    slug: slug,
    title: data["title"],
    date: Date.parse(data["date"]),
  };

  return post;
};

const getAllPosts = async () => {
  const filenames = await fsPromise.readdir(outputPostDirPath);
  const slugs = filenames.map((filename) => filename.replace(/\.html$/, ""));
  const promisePosts = slugs
    .filter((filename) => filename != "preview.md")
    .map(async (filename) => await getPost(filename));
  console.log("Getting filename list...");
  const posts = await Promise.all(promisePosts);
  posts.sort((a, b) => b.date - a.date);

  return posts;
};

const createFeed = (post: Post) => `    <item>
      <title>${post.title}</title>
      <link>https://oldbigbuddha.dev/posts/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;

const writeRss = async (filePath: string, content: string) => {
  try {
    console.log(`Writing to ${filePath}`);

    await fsPromise.writeFile(filePath, content, "utf-8");
  } catch (err) {
    console.error(err);
  }
};

const generateRss = async () => {
  const posts = await getAllPosts();
  const lastBuildDate = new Date(posts.slice(-1)[0].date).toUTCString();
  const feeds = posts.map((post) => createFeed(post));

  const rss = `<?xml version="1.0" ?>
<rss version="2.0">
  <channel>
    <title>Simple is Best</title>
    <link>https://oldbigbuddha.dev</link>
    <description>シンプルが一番</description>
    <language>ja</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${feeds.join("\n")}
  </channel>
</rss>`;

  const filePath = join(process.cwd(), "out/posts/rss.xml");

  await writeRss(filePath, rss);
};

generateRss();
