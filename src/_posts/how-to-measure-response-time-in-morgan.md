---
title: morgan はどうやってレスポンスタイムを計測しているのか
date: 2022-09-03
---

[Express.js](https://expressjs.com/) には Express.js チームが作成した [morgan](https://github.com/expressjs/morgan) というアクセスログを取るためのミドルウェアが存在しています。こんな感じで Express.js のアプリケーションに挟んでおけば HTTP リクエストが来た際に良い感じでログを出力してくれます。

```ts
import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("tiny"));

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

ログ↓

```txt
Server is running on port 3000
GET / 200 12 - 1.893 ms # ← アクセスログ
```

ここで出力されているログにはレスポンスタイムと言って「リクエストが morgan ミドルウェアを通過してからレスポンスヘッダーが書き込まれるまでの時間」をミリ秒で表示してくれています。どのエンドポイントが原因で処理落ちしているかなどの検査をする際にとても有用な情報なのですが、そもそも morgan はこの情報をどのように計測しているのでしょうか。

## 色々分かってる人向け結論

まず、morgan はリクエストが通過した際に `req._startAt` へ通過した瞬間の時刻を設定しておきます。次にレスポンスヘッダーが生成されるタイミングで `req._startAt` へ現在時刻を設定します。あとはレスポンスが送信されたタイミングでその差分をログ出力します。

レスポンスヘッダーが生成される瞬間やレスポンスが送信された直後に発火するリスナーは標準では存在しませんが、[on-headers](https://github.com/jshttp/on-headers) や [on-finished](https://github.com/jshttp/on-finished) というライブラリを使うことで追加できます。これらは Express.js よりも下の部分（標準の `http` モジュール）に依存した実装がなされているので、今回の実装を覚えておけば他のフレームワークでも応用がききそうです。

ここで注意したいのは `req._startAt` がセットされるのが `morgan` というミドルウェアを通過した瞬間であることです。実装していくうちに（既存・内製問わず）他のミドルウェアを追加していくことになりますが、`app.use(morgan())` を呼び出すタイミングに気をつけないと本当は処理時間を計測したいミドルウェアを省いてしまっていたり、逆に計測しても意味がない処理まで計測してしまうという事態が起こりえます。後者はなかなかないとは思いますが、前者は Express.js ミドルウェアあるあるなので「とりあえず morgan は最初に読み込んでおく」ぐらいに覚えておくと良いかもしれません。

以降はメモの意味も含めて細かく分割して少しずつ解説しています。

## Express.js のミドルウェアについて

そもそも Express.js のミドルウェアについて軽くおさらいしておきます。[公式ページ](https://expressjs.com/en/guide/writing-middleware.html)には以下の通り説明があります。

> Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.
> Middleware functions can perform the following tasks:
> - Execute any code.
> - Make changes to the request and the response objects.
> - End the request-response cycle.
> - Call the next middleware in the stack.
> - If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

ミドルウェア関数は「リクエストオブジェクト、レスポンスオブジェクト、次の関数」にアクセスできる機能だよとあります。ここで言及されている「次の関数」というのは実装目線で言えば「`app.use()` を呼んだ順番で考えて次」と意味です。

```ts
function middleware1(req: express.Request, res: express.Response, next: express.NextFunction) {
  // なんか処理

  next(); // ← これは `middleware2` が呼ばれる
}

function middleware2(req: express.Request, res: express.Response, next: express.NextFunction) {
  // なんか処理

  next(); // ← これは `middleware3` が呼ばれる
}

function middleware3(req: express.Request, res: express.Response, next: express.NextFunction) {
  // なんか処理

  res.send(data); // 最後のミドルウェアなので next ではなくレスポンスを返してあげる
}

app.use(middleware1);
app.use(middleware2);
app.use(middleware3);
```

`next()` にエラーオブジェクトを渡すとエラーハンドリング用ミドルウェアが呼ばれたりしますが、今回は関係ないので割愛します。重要なのは「リクエスト・レスポンス情報」にアクセスできる（多分）唯一の方法ということです。

## 愚直にアクセスロガーを書いてみる

以上の知識を踏まえてアクセスロガーとして動作するアクセスロガーを実装してみます。

```ts
import express from "express";
import type { RequestHandler } from "express";

function accessLogger(): RequestHandler {
  return (req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`); // リクエストが通った瞬間にログ出力
    next();
  };
}

const app = express();

app.use(accessLogger());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

これで実行すると、以下のようなログが吐き出されます。

```txt
Server is running on port 3000
GET / # ← アクセスログ
```

ここまで実装するとわかるんですが、現状で処理時間を取得する仕組みというのがありません。そもそも処理時間は処理が終わらないとわからないわけですが、この実装ではリクエストが来た瞬間にログが吐かれているのでどうあがいても処理時間を取得できません。

どうすりゃええねん。

## morgan の実装を見る

ここで morgan の実装を見てみます。初期化の際に渡す書式の中に `:response-time` を設定すればレスポンスまでの時間が取得できますので、その文字列で検索してみると知りたかった感じの実装が見つかります。

```js
// ref: https://github.com/expressjs/morgan/blob/19a6aa5369220b522e9dac007975ee66b1c38283/index.js#L224-L240
/**
 * response time in milliseconds
 */

morgan.token('response-time', function getResponseTimeToken (req, res, digits) {
  if (!req._startAt || !res._startAt) {
    // missing request and/or response start time
    return
  }

  // calculate diff
  var ms = (res._startAt[0] - req._startAt[0]) * 1e3 +
    (res._startAt[1] - req._startAt[1]) * 1e-6

  // return truncated value
  return ms.toFixed(digits === undefined ? 3 : digits)
})
```

`res._startAt` と `req._startAt` の差分を取っていることが分かりましたが、Express.js には標準で `_startAt` が存在していません。このプロパティも morgan が勝手に足してるようなので、どうやって追加しているか調べます。

```js
// ref: https://github.com/expressjs/morgan/blob/19a6aa5369220b522e9dac007975ee66b1c38283/index.js#L103-L146
/**
 * Create a logger middleware.
 *
 * @public
 * @param {String|Function} format
 * @param {Object} [options]
 * @return {Function} middleware
 */

function morgan (format, options) {
  // ... 省略 ...
  return function logger (req, res, next) {
    // request data
    req._startAt = undefined
    req._startTime = undefined
    req._remoteAddress = getip(req)

    // response data
    res._startAt = undefined
    res._startTime = undefined

    // record request start
    recordStartTime.call(req)

    function logRequest () {
      if (skip !== false && skip(req, res)) {
        debug('skip request')
        return
      }

      var line = formatLine(morgan, req, res)

      if (line == null) {
        debug('skip line')
        return
      }

      debug('log request')
      stream.write(line + '\n')
    };

    if (immediate) {
      // immediate log
      logRequest()
    } else {
      // record response start
      onHeaders(res, recordStartTime)

      // log when response finished
      onFinished(res, logRequest)
    }

    next()
  }
}

// ref: https://github.com/expressjs/morgan/blob/19a6aa5369220b522e9dac007975ee66b1c38283/index.js#L522-L530
/**
 * Record the start time.
 * @private
 */

function recordStartTime () {
  this._startAt = process.hrtime()
  this._startTime = new Date()
}
```

ここまで読むと `onHeaders()` と `onFinished()` を使って `recordStartTime()` を実行するタイミングをずらしていることが分かりましたが、それぞれどのようなタイミングで呼び出しているのでしょうか。

## `onHeaders()` / `onFinished()`

結論のセクションでも触れていますが、`on-headers` / `on-finished` はそれぞれレスポンスが作成されるタイミング、送信されるタイミングにリスナーとして処理を挟み込めるライブラリです。

`on-headers` は `http.ServerResponse` に生えている `writeHead()` 関数の中にリスナーを挟み込むという実装をしてくれています。`on-finished` はリスナーの実行タイミングを合わせるためか実装が複雑で正しく読めてる自信はないのですが、`http.ServerResponse` のイベントである [`'close'`](https://nodejs.org/api/http.html#event-close_2) と [`'finish'`](https://nodejs.org/api/http.html#event-finish_1) が発火した直後にリスナーを実行するという感じでした。後者の実装についてはちゃんと読めてるか不安なので、もし間違ったことを書いていたらごめんなさい。

これらの情報と morgan の実装を照らし合わせると、以下の順番でレスポンスタイムが計測されていることがわかります。

1. morgan ミドルウェアにリクエストが届く
1. リクエストオブジェクトにリクエストが届いた時刻を格納する
1. `onHeaders()` を使って「レスポンスが作成されるタイミングでその時刻を格納する処理」を登録する
1. `onFinished()` を使って「レスポンスが送信されるタイミングでその時刻を取得し、リクエストが作成された時刻との差分を出し、ログを吐く処理」を登録する

## 実装して確かめる

理屈は完全理解しましたので、実装して確かめてみましょう。今回は TypeScript を使って実装するので型周りが少々ややこしいですが、そのややこしさをちゃんと咀嚼することで学べることもあります。

まずはリクエスト・レスポンスオブジェクトに `_startAt` が生えていない問題があるので、アンビエント宣言を使って型を拡張します。

```ts
// index.d.ts
declare module "http" {
  interface ServerResponse {
    _startAt: bigint;
  }
}

declare module Express {
  interface Request {
    _startAt: bigint;
  }
}
```

リクエストとレスポンスで型を拡張しているモジュールが違うのですが、これは `onHeaders()` のリスナーに渡される型が `http.ServerResponse` だからです。レイヤーを揃えたほうがきれいな感じはするので、`http.IncomingMessage`/`http.OutgoingMessage` を拡張するのもありです。

注意点としては、`_startAt` の型を `number` ではなく [`bigint`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/BigInt) にしてください。今回は昔からある `process.hrtime()` ではなく、`bigint` の値を返す `process.hrtime.bigint()` を使うためです（morgan でも使っている `process.hrtime()` は [legacy version](https://nodejs.org/api/process.html#processhrtimetime:~:text=Stability%3A%203%20%2D%20Legacy.%20Use%20process.hrtime.bigint()%20instead.) とされています）。

```ts
import { setTimeout } from "timers";

import express from "express";
import onHeaders from "on-headers";
import onFinished from "on-finished";

import type { ServerResponse } from "http";
import type { RequestHandler, Request } from "express";

function accessLogger(): RequestHandler {

  // 1. ミドルウェアにリクエストが届く
  return (req, res, next) => {

    recordStartTime(req); // 2. リクエストオブジェクトにリクエストが届いた時刻を格納する

    // 3. `onHeaders()` を使って「レスポンスが作成されるタイミングでその時刻を格納する処理」を登録する
    onHeaders(res, function() {
      recordStartTime(this);
    });

    // 4. `onFinished()` を使って「レスポンスが送信されるタイミングでその時刻を取得し、リクエストが作成された時刻との差分を出し、ログを吐く処理」を登録する
    onFinished(res, function() {
      const diff = res._startAt - req._startAt; // MEMO: ここで `process.hrtime.bigint() - req._startAt` にすると `:total-time` が取得できます
      const ms = Number(diff / BigInt(1e6)); // 1ms = 1e6ns
      console.log(`${req.method} ${req.originalUrl} ${ms}ms`);
    });

    next();
  };
}

function recordStartTime(arg: Request | ServerResponse) {
  arg._startAt = process.hrtime.bigint();
}

const app = express();

app.use(accessLogger());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// 時間がかかる処理を挟んでる想定で1秒待たせる
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
app.get("/wait",async (_req, res) => {
  await wait(1000);

  res.send("Thank you for waiting 1000ms!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

```

これで動かしたサーバーのログは以下の通りです。

```txt
Server is running on port 3000
GET / 2ms
GET /wait 1001ms
```

ちゃんとレスポンスタイムが取れていますね！

## 余談: ロガーの変更

そもそもなんでこんなマニアックなことを調査したのかと言うと、ロガーを自分好みを使いつつ morgan の `:response-time` と同じ値が取りたいなと言うのが主な理由でした。ここまで調べて「良い汗かいたぜ」みたいな自己満足を味わっていたら[初期化時のプロパティでロガーを指定できるという記事](https://qiita.com/shiena/items/a8b6c117d83cac87910b)を見つけて泣いてました。2日ぐらい使って調査した努力は一体……。

ちなみに morgan の README.md を読んでみたら[サラッと書いてました](https://github.com/expressjs/morgan#stream)。Examples の部分にも書いておいて欲しかったです（読む前にコード読み始めちゃったんで結局この調査はしていたと思いますが）。
