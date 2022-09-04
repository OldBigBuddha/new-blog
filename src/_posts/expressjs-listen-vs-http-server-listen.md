---
title: express を起動するときのサンプルコードが2パターン存在する件に決着をつける
date: 2022-09-02
---

[Express.js](https://expressjs.com/) を用いて Web サーバーを作成しようとしたとき、ネットでサンプルコードを漁ると以下の2パターンが確認できます。

パターン1: Express.js のアプリケーションから生えてる関数を使ってサーバーを起動する
```js
const app = require("express")();

// Setting for Express Application

app.listen(port); // Express.js のアプリケーションを使っている
```

パターン2: [http](https://nodejs.org/api/http.html) モジュールの `createServer()` で Server を生成してからそのサーバーを起動する
```js
const http = require("http");
const app = require("express")();
const server = http.createServer(app);

// Setting for Express Application

server.listen(port); // http.Server を使っている
```

とりあえずサーバーを立ち上げたいのであればどっちを使っても起動するわけなんですが、具体的にどういう差があるのかは調べたことなかったので調べてみます。（ちなみにまったく同じ趣旨の質問が [Stack Overflow](https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen) にあります。この記事の中身はその回答の抜粋まとめのようなものです。）


## 結論

最初に結論を書いておくと双方**挙動は同じ**です。どのレベルで同じかと言うと、`app.listen()` 内で `http.createServer()` を呼んでから `server.listen()` を実行しているレベルで同じ動きをします。なので、記述量とかシンプルさ的な観点で `app.listen()` を利用することが基本という認識で問題無さそうです。

ただし、例外が存在します。`app.listen()` には `http` モジュールの `Server` を起動する処理しか書いていないので、Node.js のレベルで HTTPS サーバーも動かしたい場合や同じシステム上で Socket.IO を使いたい場合は後者（HTTP モジュールを使うやつ）の方法を取る必要があります。

以降は実際に調べて自分が納得した根拠等を挙げてるだけです。

## 根拠

GitHub へ覗きに行くと、`app.listen()` は以下の実装になっています（`4.18` というタグを[参照](https://github.com/expressjs/express/blob/4.18/lib/application.js#L633-L636)しています）。

```js
/**
 * Listen for connections.
 *
 * A node `http.Server` is returned, with this
 * application (which is a `Function`) as its
 * callback. If you wish to create both an HTTP
 * and HTTPS server you may do so with the "http"
 * and "https" modules as shown here:
 *
 *    var http = require('http')
 *      , https = require('https')
 *      , express = require('express')
 *      , app = express();
 *
 *    http.createServer(app).listen(80);
 *    https.createServer({ ... }, app).listen(443);
 *
 * @return {http.Server}
 * @public
 */

app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

まんまですね。ここのコメントに HTTPS サーバーも一緒に建てるなら `createServer()` を自分で呼び出そうねみたいなことが書いてあります。

GitHub を見に行った後で Express.js 4 系のドキュメントを見てたら `app.listen()` の[説明文](https://expressjs.com/en/api.html#app.listen)に上記と同じことが書いてありました。まずはドキュメントは見ろよっていう。

