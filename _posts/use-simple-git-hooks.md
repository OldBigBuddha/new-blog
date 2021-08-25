---
title: simple-git-hooksとlint-stagedを使ってソースコードを健全に管理する
code: true
date: 2021-08-25
---

コードを保守する上で大切なことのひとつはフォーマッティングです。プロジェクトで定められたコード規約にしたがって書かれているのか、そんなものはなく各自で好きなように書いているのかではやはりコードの質に影響します。読みやすいコードはプログラマの理解を捗らせ、モチベーションを維持してくれるでしょう。では、そんな健全なソースコードを維持し続けるにはどのような取り組みをするのが良いのでしょうか？

`package.json` に以下のようなスクリプトを登録しておき、各自で `git add` をする前に実行するというのはひとつの案です。

```json
"lint:fix": "prettier --write src",
```

しかしながら私達人間は仕様上忘れる生き物ですから、たまには忘れて `git commit` をしてしまうかもしれません。commit した段階で気付ければ `git commit --amend` などでサクッと直せますが、もし仮にも `git push` なんてしようものなら取り返しが付きません。

そんな悩みを解決するのが `simple-git-hooks` と `lint-staged` の組み合わせです。

## Git Hooks と simple-git-hooks

Git には Git Hooks という機能が存在します。詳細は [Git Pro](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF) を読んでいただきたいのですが、雑に言うと `git xxxx` の前後に処理を挟む機能です。つまり `git commit` の直後に任意のフォーマッティングが自動で走るわけですね。これは最強。

Git Hooks は所詮シェルスクリプトですのでえっちらおっちら熟成させても良いわけですが、わざわざフォーマッタひとつ動かすためだけに `.git` 下をいじるなんてのは面倒くさいです（気をつけないといけないこともあるし）。なので、そこを楽に運用するために [`simple-git-hooks`](https://github.com/toplenboren/simple-git-hooks) を使います。名前の通りですね。これを使う場合は `package.json` 内に Git Hooks として登録したいコマンドを設定しておきます。

```json
// package.json
{
  // ...
  "simple-git-hooks": {
    "pre-commit": "npx prettier --write src"
  },
  // ...
}
```

あとは `npx simple-git-hooks` を実行すれば `.git/hooks/pre-commit` が更新され、`git commit` を実行するとコードが整形されて commit されます。とっても素晴らしい。

## lint-staged

もちろんこれで健全なソースコードを保持し続けることができるのですが、プロジェクトの規模が多くなると全体フォーマッティングに時間がかかるようになります。これまでのコードは当然整形済みですので、新たにステージングされたファイルのみ整形を適応することがもっとも効率良さそうです。そんな願いを叶えてくれるのが [`lint-staged`](https://github.com/okonet/lint-staged) です。README.md の先頭に `Run linters against staged git files and don't let 💩 slip into your code base!` とある通り、ステージングされたファイルに対してのみフォーマッティングをかけてくれます。もちろんフォーマッターは設定可能です、最強ですね。

prettier で整形する場合はこんな感じです。

```json
// package.json
{
  // ...
  "lint-staged": {
    "*": "prettier --ignore-unknown --write",
  }
}
```

## まとめ

これまでの情報を整理します。`lint-staged` を使うとステージングされたファイルのみフォーマッティングすることが可能になります。そして、`simple-git-hooks` を使うと `git commit` の直前に自動で任意のコマンドを実行できます。つまり **`simple-git-hooks` を使って `git commit` の直前に自動で `lint-staged` を実行すれば `git add` されたファイルのみ整形されるという流れを作ることができます**。人類天才か？？？

ということでそんな設定を施した `package.json` がこちらです。

```json
{
  // ...
  "scripts": {
    "prepare": "simple-git-hooks",
    // ...
  },
  // ...
  "lint-staged": {
    "*": "prettier --ignore-unknown --write"
  },
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  // ...
}
```

一番最初に `npx simple-git-hooks` を実行しないと Git Hooks として登録されません。なので、`npm run prepare` とわかりやすいスクリプトを定義しておきました。もしこれ以外に初期設定が必要な場合は `prepare` に書き足せばよいだけですからね。

では、健全なソースコード管理をお楽しみください。

## 余談

これを実装したら GitHub Action とかの CI でコードスタイルをチェックする部分を無くすことができるのかな？ここらへんはプロジェクトの好みになりますが……。
