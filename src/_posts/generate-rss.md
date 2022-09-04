---
title: Nextjs 製のブログにRSSを実装する
date: 2021-01-04
tags:
  - Nextjs
---
このブログに RSS を導入したので、そのときの知見をメモしておきます。

## 環境

このブログは Nextjs で構築して Vercel にデプロイしているので、その環境で使えることができたということを先にご了承ください。ただ、大きく環境依存した実装をしたわけではないので、以下の環境でかつ SSG として Nextjs を利用されている場合はうまく動作すると思います。

- Nodejs v12
- TypeScript 4.1.3
- Nextjs 10

## アプローチ

いろいろ調べたところ SSR として配信する方法と、デプロイの際にスクリプトを実行して XML ファイルを生成する方法と二種類ありました。個人的になるべく SSG 的な方法を取りたかったので、TypeScript で RSS Feed を生成するスクリプトを書いて、`next export` する際にそのスクリプトを実行する方法を取りました。

## スクリプト

こちらが実際に動いているスクリプトを少し改変したものになります。一部インデントが崩れているのは出力した XML をキレイにするためです。

```ts
import * as fs from "fs";
const fsPromise = fs.promises;

import { join } from "path";

import matter from "gray-matter";

type Post = {
  slug: string;
  title: string;
  date: number;
};

const URL = "https://blog-url.com"
const POST_URL = `${URL}/posts`
const RSS_URL = `${URL}/feed.xml`
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
  const promisePosts = slugs.map(async (filename) => await getPost(filename));
  const posts = await Promise.all(promisePosts);
  posts.sort((a, b) => b.date - a.date);

  return posts;
};

const createFeed = (post: Post) => `    <item>
      <title>${post.title}</title>
      <link>${POST_URL}/${post.slug}</link>
      <guid>${POST_URL}/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;

const writeRss = async (filePath: string, content: string) => {
  try {
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
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Title</title>
    <link>${URL}</link>
    <description>なんか一言</description>
    <language>ja</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${RSS_URL}" rel="self" type="application/rss+xml" />
${feeds.join("\n")}
  </channel>
</rss>`;

  const filePath = join(process.cwd(), "out/feed.xml");

  await writeRss(filePath, rss);
};

generateRss();
```

実行されると `next export` で出力されるディレクトリに `feed.xml` が生成されます。ファイルパスが違わなければコピペで動くと思います。僕はプロジェクトルートにこのスクリプトを保存して、`package.json` に `"build": "next build && next export && tsc generate-rss.ts --esModuleInterop && node generate-rss.js"` と書いて Vercel 上で実行しています。

RSS の日付におけるベストプラクティスは [RFC-822](https://tools.ietf.org/html/rfc822) なので注意してください。`date.toUTCString()` でいい感じになります。

Vercel のランタイムが Nodejs v12 までしか対応してないらしく、`fs/promises` でインポートできなかったところが残念です。早く v14 に対応してほしいですね。

それと、`next export` の Hook 的なものが欲しいなと思いました。ここが拡張できたら npm scripts がシンプルに書けそうです。

## 仕上げに

HTML の `head` に以下の一行を追加しておきます。RSS Auto Discovery と言って、対応しているブラウザがこのタグを見て RSS Feed の URL を引っ張ってきてくれます。

```html
<link
  rel="alternate"
  type="application/rss+xml"
  title="Blog Title"
  href="RSS Feed URL" />
```
