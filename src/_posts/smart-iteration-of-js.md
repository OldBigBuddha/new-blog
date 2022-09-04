---
title: JS で繰り返し処理をナウく書く
date: 2021-08-01
---

プログラムを書いているとと配列に含まれる要素を基にした処理（「要素のプロパティのみを抜き出して配列にする」とか「条件に合う要素だけ抜き出して別の配列にする」とか）を必要とする場面に多々遭遇します。もちろん for 文を使えば実装が可能ですが、JavaScript にはより簡素にかつわかりやすく記述する手段が準備されています。この記事では初歩的な for 文からはじめ、拡張 for 文を経由した後 `map()` や `filter()` などの現代的な配列操作について紹介します。

## 前提知識

この記事を読むにあたって、最低限の JavaScript の知識が必要となります。具体的には以下の文章を読んでふむふむと理解ができれば、あなたはこの文章を読むにあたって本質的なところ以外でつまずかないと言えます。

- 同じ処理を繰り返す場合は for 文を使う
- 関数は変数に代入ができる
- 引数に関数を指定することができる（変数として渡すこともできるし、引数を書くところで直接関数を定義することも可能）
- アロー関数は `{}` や `()` を省略して書くことができるときもある

以下のコードを見て「`Hello OJI` が10行表示されるな」となんとなく理解できれば十分です。

```js
const greeting = name => console.log(`Hello ${name}`);

for (let i = 0; i < 10; i++) {
  greeting("OJI");
}
```

## この記事のゴール

この記事を最後まで読めば、提示するお題を for 文を用いるよりも簡素にかつ読みやすく実装をすることができるようになります。

※ お題に関しては、すべて以下の配列を前提にしてます。

```js
const people = [
  {
    name: "alice",  // 名前（文字列）
    age: 18         // 年齢（数値）
  },
  {
    name: "bob",
    age: 31
  },
  {
    name: "candy",
    age: 12
  },
  {
    name: "daniel",
    age: 28,
  }
];

```

お題:

- `name` のみを抜き出した配列を作る
- 20 歳以上の人物のみで配列を作る
- `console.log()` を用いて特定のフォーマットで要素を出力する

## for 文

まずは基本の確認です。お題の処理を for 文を用いて実装してみます。

```js
// `name` のみを抜き出した配列を作る
const names = [];

for (let i = 0; i < people.length; i++) {
  names.push(people[i].name);
}

// 20 歳以上の人物のみで配列を作る
const adults = [];

for (let i = 0; i < people.length; i++) {
  if (people[i].age >= 20) {
    adults.push(people[i]);
  }
}

// `console.log()` を用いて特定のフォーマットで要素を出力する
for (let i = 0; i < people.length; i++) {
  const person = people[i];
  console.log(`name: ${person.name}, age: ${person.age}`);
}
```

こんな感じですね。お題ごとに for 文を書いているのは、今後それぞれで書き方が変わってくるため比較しやすいようにという意図があります。

これをどんどんナウくします。

## for...of 文

JavaScript には配列の操作に特化した for...of 文というものがあります。上のセクションのコードを for...of 文で書き直すとこうなります。

```js
// `name` のみを抜き出した配列を作る
const names = [];

for (const person of people) {
  names.push(person.name);
}

// 20 歳以上の人物のみで配列を作る
const adults = [];

for (const person of people) {
  if (person.age >= 20) {
    adults.push(person);
  }
}

// `console.log()` を用いて特定のフォーマットで要素を出力する
for (const person of people) {
  console.log(`name: ${person.name}, age: ${person.age}`);
}
```

括弧の中がスッキリして読みやすくなりましたね。また、ループ内で使う変数定義をする際に `let` ではなく `const` となっているところも良いですね（再代入の必要がない変数は可能な限り再代入不可にしたほうが管理しやすい）。

構文は以下の通りです（念の為）。

```js
for (const 変数 of 配列) {}
```

余談ですが JavaScript には for...in 文というものがあります。for...of 文は各要素を取り出すのに対し、for...in 文は各要素の添え字を取り出します。通常**キーが文字列であるオブジェクト**に利用する構文ですので、今回紹介する配列には使わない構文となります。キーワードひとつしか違わないので、`of` なのか `in` なのか勘違いしないように気をつけましょう。私は一度勘違いをして1時間ほど修正に時間を取られたことがあります（配列に用いても構文エラーにはならないので……）。

## `map()` や `filter()` や `forEach()`

さて、本題です。ここから各お題に対して書き方が変わってきますので、ひとつずつセクションに分けて見ていきましょう。

### `name` のみを抜き出した配列を作る

このお題の本質は**既存の要素を加工して新しい配列を作る**ことです。具体例に沿って言うと、`people` という配列を基に `names` という配列を作っています。こういった処理はプログラミングの世界で頻出しますので、JavaScript ではそれに特化した `map()` という関数が定義されています。「**既存の配列を基に別の配列を作るときは `map()` を使う**」と覚えておけば問題ありません。

では実際にコードを見てみましょう。

```js
const names = people.map(person => person.name);
```

恐らく何も知らなければ「は？」の一言だと思います。分解して説明します。

まず `map()` の構文は以下の通りです（必須でない内容は省略しています）。

```js
const newArray = array.map(要素毎に実行したい関数);
```

要するに **`map()` の引数に関数を投げればその処理が要素毎に実行される**わけですね。ここで気をつけないといけないことは、**引数に渡す関数はある値を基に別の値を生み出すための関数である**ことです。つまり要素を引数に取って、新しい配列の要素となる値を返り値とする関数を定義しなくてはいけないということです。「既存の要素を加工して新しい配列を作る」ための関数ですから当然といえば当然ですね。

お題とは別の例として、数値配列の要素すべてを2倍にする処理を `map()` で考えてみましょう。

まず、与えられた数値を2倍にする関数はこう書きます。

```js
const double = x => x * 2;
```

アロー関数は `{}` を省略した場合、評価結果がそのまま返り値となりますのでこのような短い書き方になります。

ここで書いた2倍にする関数を `map()` へ渡しますので、こう書きます。

```js
const nums = [1, 2, 3, 4];
const double = x => x * 2;

// map() の引数は関数そのものですので、map(double()) ではなく map(double) と書きます。
// map(double()) と書いてしまうと、double() 関数の実行結果が map() の引数になってしまうからです。
const doubledNums = nums.map(double);
```

`double()` は `nums` の要素ひとつずつに適応されます。1番目の要素は `1` ですので、それが `double()` に渡されて `2` という数値が返って、それが `doubleNums` の1番目の要素となります。あとはこの処理が要素の数分繰り返されるわけです。

今の例をお題である「`name` のみを抜き出した配列を作る」に合わせて考えてみます。

まずは「`name` のみを抜き出す」関数を考えます。

```js
// person のプロパティは name と age
const getName = person => person.name
```

これを `map()` の引数に指定して、`people` 配列を加工します。

```js
// お題のコードなので people の定義は省略
const getName = person => person.name

const names = people.map(getName);
```

`getName()` の返り値が `names` の要素となります。もちろん毎回このような書き方をしても問題はありませんが、使い回す予定がない関数を変数として保持し続けることはあまり意味がありませんので、通常は引数部分で関数を定義してしまいます。無名関数と呼ばれる書き方ですね。1回ポッキリの処理を書く際によく使われます。

```js
const names = people.map(person => person.name);
```

順番に見ていけば納得ですね。

### 20歳以上の人物のみで配列を作る

ではこの調子でどんどん進めていきましょう。他の関数も `map()` と書き方はほぼ一緒ですので、あとは本質的な処理と関数の対応さえ理解できればバッチリです。

さてさてこのお題の本質ですが、**条件に合う要素飲みを取り出して新しい配列を作る**ことです。これもよくある処理ですね。このような場合は `filter()` を使います。「**条件でフィルタリングするときは `filter()` を使う**」と考えれば一発で覚えられますね。お題をコードにするとこうなります。

```js
const adults = people.filter(person => person.age >= 20);
```

`map()` とほとんど同じ書き方ですので、違いのみ説明します。`map()` との違いは `filter()` に渡す関数の返り値の種類です。`map()` の返り値は新たな配列の要素ですので、数値・文字列・オブジェクトと色々指定することができました。しかし、**`filter()` で大事なのは条件に合った値か否か** ですので、必然的に返り値は `boolean` の値（`true`/`false`）になります。いったん何かしらの加工をしない限り条件式をそのまま書くのが一般的です。

### `console.log()`を用いて特定のフォーマットで要素を出力する

では最後のお題です。このお題の本質は「**要素の数だけ処理をする**」ことです。コードを見ていただければわかりますが for...of 文とほとんど変わりません。

```js
people.forEach(person => console.log(`name: ${person.name}, age: ${person.age}`));
```

これまでの関数は新たな配列を返り値として返していましたが、`forEach()` は常に `undefined` を返します。つまり、`map()` や `filter()` とは少し毛色が違うわけですね。注意点として、**`forEach()` のループを終了させるためには例外を発生させなくてはなりません**。つまり要素の内容によって `break` するみたいなことが出来ないということです。もし途中でループを中断したい場合は for 文などを使いましょう。

説明からわかる通り、使い道がかなり限られています。`forEach()` を使う機会は（私の知る限り）あまりないので、そんな関数もあるんだなぐらいの理解で大丈夫だと思います。デバッグとかのときは重宝しそうですね（ですが `console.table()` とかあるのでデバッグですら使わないかも……）。

これまで説明を省いていましたが、引数に投げる関数には第2引数として要素の添え字を取得できます。なので、以下の書き方をするために `forEach()` を選ぶというのはありかもしれません。

```js
people.forEach((person, idx) => {
  console.log(`${idx + 1}番目: ${person.name}`);
});
```

今の私だとこのぐらいしか思いつきませんでした。

## 応用: 20歳以上の人物の名前を配列にする

最後に複合的なお題を扱ってみましょう。このお題には必要な処理が2つあることに気がついたでしょうか？「20歳以上の人物」という条件でかつ「名前のみ」という配列を作る必要があります。これらの処理はそれぞれお題として扱っていますね。早速コードにしてみます。

```js
const adults = people.filter(person => person.age >= 20);
const adultNames = adults.map(adult => adult.name);
```

こんな感じですね。これだけでも十分簡素になりましたが、実はもう少しだけ短くできます。`map()` や `filter()` の返り値は配列ですので、その配列から当然 `map()` などの関数を生やすことができます。言葉にするとわかりにくいかもしれませんが、コードを見れば一発で理解できるかと思います。

```js
const adultNames = people
                    .filter(person => person.age >= 20)
                    .map(adult => adult.name);
```

これを読みやすいと思うかそうでないと思うかはあくまで個人の好みですので良し悪しを付ける必要はありませんが、世の中にはこういう書き方もあるということを理解しておくのは良いことだと私は思います。

皆さんは分けて書きたい派でしょうか？まとめて書きたい派でしょうか？ちなみに私は基本的にまとめて書きたいと思っています（処理的に読みにくいと感じたりすると分けることもあります）。

## async/await、Promise との付き合い方

※ 少し高度な内容ですので、とりあえず `map()` とかの使い方が知りたかっただけの方は読み飛ばしても大丈夫です。

今回紹介した `map()` や `filter()` と Promise を用いた非同期処理を同時に活用する際にはひと手間必要になります。たとえば以下のコードは意図したように動きません。

```js
const urls = [...URL文字列の配列...];

// レスポンスボディを配列にしようとしている
const responses = urls.map(async url => {
  return await axios.get(url).data;
});
```

これを正確に説明するには Promise の説明が必要となり、この記事が説明したい内容から大きく離れてしまいます。なので、ざっくり言ってしまうと `async` がついた関数の返り値は必ず Promise と呼ばれるオブジェクトに覆われた状態で返ってきます。たとえば以下の関数の返り値は文字列ではなく Promise です。

```js
const greeting = async name => `Hello ${name}`;
```

つまり `responses` はレスポンスボディではなく Promise の配列になってしまってるわけです。ではどうすれば意図した値を扱えるようになるのか。それは Promise の配列を `Promise.all()` に渡すことによって実現されます。先ほどのリクエストの例を以下のように書くとうまく動きます。

```js
const urls = [...URL文字列の配列...];

// これで responses はレスポンスボディの配列になる
const responses = await Promise.all(urls.map(async url => {
  return await axios.get(url).data;
}));
```

ここらへんの詳しい挙動に関しては Promise を勉強することによって理解できます。非同期処理とはなにかというところから解説してくださっている記事があるので、紹介しておきます。

- [JavaScriptの非同期処理を理解する その1 〜コールバック編〜 | さくらのナレッジ](https://knowledge.sakura.ad.jp/24888/)
- [JavaScriptの非同期処理を理解する その2 〜Promise編〜 | さくらのナレッジ](https://knowledge.sakura.ad.jp/24890/)

## まとめ

ここで一番最初に挙げたお題リストをもう一度確認します。

- `name` のみを抜き出した配列を作る
- 20 歳以上の人物のみで配列を作る
- `console.log()` を用いて特定のフォーマットで要素を出力する

もう皆さんはお題を見てどのような形のコードを書くか、思い浮かぶようになりましたでしょうか？今回紹介した関数は for 文や for...of 文を使うことに比べて記述量が少なく済み、かつどんな処理をするためのコードなのかわかりやすくなるという利点を備えています。パッと見たときに `filter(〜〜)` と書かれているコードと for...of 文で書かれているコードだと読み取れる情報量が違いますよね（前者は条件で要素を選んでいることがわかるが、後者は要素の数だけ処理を繰り返していることしかわからない）。「JavaScript ではもう for 文を使わなくても良い」とは言い切れませんが、積極的に今回ご紹介した関数を活用することで皆さんのコードがより読みやすくなれば良いなと思っています。

今回ご紹介した関数以外にも `find()` や `every()`、`some()` など配列操作をするための関数はもっともっと用意されています。ぜひ [MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods) などで探してみてくださいね。

## 参考資料

- [反復処理プロトコル - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols)
- [for...of - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of)
- [Array - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)
- [Array.prototype.map() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.filter() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.forEach() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
