---
title: Tailwind CSS で独自の画像を背景に設定する
code: true
date: 2020-12-27
tags:
  - 'Tailwind CSS'
---

Tailwind CSS はデフォルトでグラデーション背景を作るためのユティリティを提供しています。しかし、`tailwind.config.js` を設定することで独自の画像を背景に設定できます。

前提として、`src` ディレクトリ下に `style/base.css` を作成し、以下のような内容になっているとします:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

ディレクトリ構造としてはこんな感じです（一部省略）:

```text
.
├── package.json
├── public
├── src
│   ├── App.tsx
│   ├── components
│   │   └── HeroHeader.tsx
│   ├── index.tsx
│   └── style
│       └── base.css
```

まずは設定したい画像を `src/img` 下に置きます。ここでは `hero-img.webp` とします。

```text
.
├── package.json
├── public
├── src
│   ├── App.tsx
│   ├── components
│   │   └── HeroHeader.tsx
│   ├── img
│   │   └── hero.webp ← 追加
│   ├── index.tsx
│   └── style
│       └── base.css
```

次に、プロジェクトルートに `tailwind.config.js` を作成し、以下のように記述します。すでに作成されている場合はよしなに取り込んでください。

```js
module.exports = {
    theme: {
      extend: {
        backgroundImage: theme => ({
         'hero-img': "url('../img/hero-img.webp')",
        })
      }
    }
  }
```

`url()` に指定するファイルパスは `base.css` が起点であることに注意してください。

```text
.
├── package.json
├── public
├── src
│   ├── App.tsx
│   ├── components
│   │   └── HeroHeader.tsx
│   ├── img
│   │   └── hero.webp
│   ├── index.tsx
│   └── style
│       └── base.css ← ここからの相対パス
└── tailwind.config.js
```

あとは、`bg-{key}`（ここでは `bg-hero-img`）をクラスに設定すれば使うことができます。
