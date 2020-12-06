---
title: Hexo に関する知見をメモしておく
date: 2020-12-06
tags:
    - Hexo
code: true
---
自分が数年ほど Hexo を触ってた中で得た知見をメモしておきます。この記事ではかなり細かいところまで触れますので、とりあえず Hexo でブログを作ってみたいみたいな方は [別記事](https://oldbigbuddha.dev/post/start-hexo) をご覧ください。

この記事で言及しているコードは [GitHub にて保存](https://github.com/OldBigBuddha/Blog) していますので、挙動を確認されたい場合はそちらの方をクローンしていただいてローカルで実行してみてください。

## 環境

以下の環境で記事を管理していました。

- Hexo 5.2.0
- Pug
- Stylus

後述しますが、既存の Hexo Theme を利用する場合はテンプレートエンジンに気をつけましょう。Pug が好きだけど ejs の Theme を選んでしまうと後で地獄を見ます。個人の感想ですが ejs と Pug なら Pug のほうがメンテナンスしやすいです。CSS は好きなもので良いと思います。

## いちから Theme を作りたい方へ

最初に宣伝ですが、私が作成した [hexo-theme-starter](https://github.com/OldBigBuddha/hexo-theme-starter) というものがあります。既存の Theme はコードが複雑でメンテしにくかったり、スタイルがどのように適用されているかいちからたどるのが面倒くさいから自作したい方向けのテンプレートです。スタイルは内包しておらず、まっさらな状態から Theme を作成できます。

Theme 自作でもっとも面倒くさいページング処理を実装しており、その上拡張しやすいように適切なコンポーネント分割がされているのが特徴です。このコードを元に作成した Theme に対して一切の縛りを課しておりませんので、営利・非営利問わず著作権表記なしでご利用いただけます。

## 必須プラグイン

どういうブログを目指すかによって多少ズレは生じるかも知れませんが、とりあえずこのプラグインはないと不便というものを列挙します。

- hexo-generator-index
- hexo-generator-tag
- hexo-generator-seo-friendly-sitemap
- hexo-autoprefixer
- hexo-browsersync

上にいくほど重要度が上がっていきます。上2つは入れてないとまともなブログを作れません。ただ、その2つはどのテンプレートにも入ってますので気にする必要はありません。

`hexo-generator-seo-friendly-sitemap` は名前の通り `sitemap` を生成してくれるプラグインです。Google 曰く小規模の Web サイトに `sitemap` を導入しても SEO 的な効果はないらしいですが、他の検索エンジンのインデックスに乗りやすくなったり Google にいち早く更新を伝えられたりと利点があるので入れていました。

`hexo-autoprefixer` は凝ったデザインをするなら必須です。名前の通り Hexo の出力処理に [`autoprefixer`](https://github.com/postcss/autoprefixer) を挟んでくれます。入れておくだけで出力される CSS にベンダープレフィックスが付くようになります。便利ですね。

`hexo-browsersync` も名前の通り [`browsersync`](https://browsersync.io/) が使えるようになります。私の場合、あまり凝った使い方はせず、セーブ時にブラウザリロードしてもらうのに活躍してもらっていました。Theme の作成やメンテナンスをするときに大活躍します。

## 波括弧の扱い

Hexo では [`Nunjucks`](http://mozilla.github.io/nunjucks/) という Mozilla が管理しているテンプレートエンジンを採用しています。このテンプレートエンジンは Python のテンプレートエンジンである `Jinja2` に影響を受けているもので、`Jinja2` と非常に相性が悪いです。具体的には文章中に `{{ variable }}` なんて書き方をすると崩れます。これを回避する方法は2つあります。

ひとつは [専用のタグを使う](https://hexo.io/docs/troubleshooting#Escape-Contents) 方法です。`{% raw %}` と `{% endraw %}` で挟まれたブロック内は Nunjucks の評価がされなくなります。他のプラグインと共存できる幸せな方法です。

もうひとつは `Nunjucks` を無効化する方法です。`Nunjucks` を無効化するには [front-matter で `disableNunjucks: true` と書く](https://hexo.io/docs/front-matter#Layout) か、[Render を定義する](https://hexo.io/api/renderer#Disable-Nunjucks-tags) と無効化できます。`Nunjucks` なんて使わねぇぜという方は後者でも良いかも知れません。

動作確認はしてませんが以下のコードを `/scripts` 下に保存すれば無効化されると思います。

```js
const renderer = hexo.render.renderer.get('md')
if (renderer) {
  renderer.disableNunjucks = true
  hexo.extend.renderer.register('md', 'html', renderer)
}
```

蛇足ですが Hexo 内で `{% tag %}` を使って埋め込む構文をタグプラグインと言い、デフォルトで [たくさんのタグ](https://hexo.io/docs/tag-plugins) がサポートされています。また、このタグは独自に定義することも可能です。

## Markdown Render

多くの場合 Markdown 用の Render は `marked` が使われていますが、別の Render を使うこともできます。有名どころでは [`hexo-render-markdown-it`](https://github.com/hexojs/hexo-renderer-markdown-it) があります。`Markdown-it` はそのものにプラグインが色々あるのでとりあえず `Markdown-it` にしておくのはありかもしれません。

## 公式ドキュメントと公式プラグインを読む

これは Hexo に限ったことではありませんが凝ったことをやりたいと思ったらまず読みましょう。ブログのカスタマイズにハマっていたときは暇さえあればドキュメントを読むかコードを読んでいました。楽しいですよ。とりあえず [Basic Usage](https://hexo.io/docs/writing) あたりをひととおり読んでおくと良いです

Theme をカスタマイズ・作成したい方は Hexo 内で使える [変数に関するドキュメント](https://hexo.io/docs/variables) を読むと良いです。ルートに置いてある `_config.yml` をテンプレートから参照するにはどうすればいいか、記事の front-matter（先頭にある `title` とか `date` とか）をどうやって参照するかなどが書いてあります。ついでに [`hexo-pagination`](https://github.com/hexojs/hexo-pagination) を読んでおくと表現の幅が広がります。

スクリプトやプラグインを書きたい方は [API Doc](https://hexo.io/api/) を読みましょう。左側に `Extensions` の種類が列挙されています。作りたいジャンルのドキュメントを読んだ後に [公式のプラグイン](https://github.com/hexojs) を読むと書けるようになります。ついでに [`hexo-util`](https://github.com/hexojs/hexo-util) と [`hexo-fs`](https://github.com/hexojs/hexo-fs) の README を読んでおくとムダな処理を書かなくて済みます。恐らく大半の方は上で言及した独自タグを定義したくてプラグインやスクリプトを書くと思います。[ここ](https://hexo.io/api/tag) を読むと幸せになれます。

### プラグインコードの読み方

Hexo のプラグインは慣習的に `/lib` に実際の処理を書いて、`index.js` でオプションの管理をしつつ処理を呼び出すといったことをしています。これを知っているだけでプラグインがぐっと読みやすくなります。

### スクリプトとプラグインの違い

スクリプトを外部モジュール化したものがプラグインとなります。小規模な処理だったり、個々のブログに依存するような処理は `/scripts` に処理を書いたファイルを置いておきます。スクリプトとプラグインで大きな差異はありません。スクリプトのコードを既存のプラグインを参考にしてちょちょっと書き換えたらプラグインになります。汎用性が高いコードを書いたらぜひ GitHub に公開してみましょう。

## Deploy 先

どこにデプロイするかは正直好みだと思います。私が把握してる範囲では GitHub Pages と Netlify あたりかなと思います。Netlify は STOP COVID-19 で使われたこともあって結構有名になったのではないかと思います（もともと有名な感じではありましたが）。私も Netlify を使っていました。[Status Badge](https://docs.netlify.com/monitor-sites/status-badges/#add-status-badges) もあってとても良い感じです。

ブログを衝動的に Next.js へ完全移行したので、とりあえず思い出せる範囲で Hexo に関する知見を書き出してみました。日本語の Hexo の情報って多くはあるんですが踏み込んだことを書いた記事が少ないんですよね。Hexo で凝ったことをしたいあなたに届けば幸いです。

普段は [Twitter](https://twitter.com/OldBigBuddha) に生息してますので、Hexo で分からないことがあったり詰まったことがあったら気軽にメンションをください。大歓迎です。
