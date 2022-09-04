---
title: ひとつのIPアドレス、ひとつのポートで複数のマイクラ鯖をホストする
date: 2021-11-08
---

マインクラフトサーバーを複数台ホストする際、一般的にはポート番号を分けることによって実現されます。ですが、個人的にポート番号も一緒にマイクラのアドレス欄に入力してもらうのは不格好に思えますし、なによりマイクラ鯖を増やすたびにルーターの設定を弄らないといけないのは面倒くさいです。そこら辺を解決するとっても自己満足な行為をここでは記しておきます（なぜか日本語で似たような情報が得られなかったので）。

## TL;DR

以下の `docker-compose.yml` を使えばタイトル通りのことが実現できます。

```yaml
version: "3.9"

services:
  mc1:
    image: itzg/minecraft-server
    environment:
      EULA: "TRUE"
  mc2:
    image: itzg/minecraft-server
    environment:
      EULA: "TRUE"
  router:
    image: itzg/mc-router
    ports:
      - 25565:25565
    command: --mapping=mc1.example.com=mc1:25565,mc2.example.com=mc2:25565
```

`/etc/hosts` などをいじって `mc1.example.com` と `mc2.example.com` を `localhost` に向けることを忘れずに。

以下本編。

## 前提条件

接続が確認できたマイクラサーバーをふたつと Docker が動かせる環境を準備してください。物理端末3台でも構いませんし、VMを3つでも大丈夫です。ちなみに私は Proxmox VE 上で LXC を3つ動かして今回の環境を実現しています。

以前に [Docker を用いたマイクラ鯖構築を記事にした](https://oldbigbuddha.dev/posts/my-server-for-minecraft)ので、そちらを参考にしてもらえれば今回の内容を含めて Docker をインストールした PC 1台で実現することも可能です（TL;DR がそれ）。

この記事では以下の構成で話を進めていきます。

- アクセスを振り分けるサーバー、192.168.101.20
- MineCraft 1.17.1 Server その1（alpha）、192.168.101.21
- MineCraft 1.17.1 Server その2（beta）、192.168.101.22

## 本記事のゴール

`alpha.mc.example.com` としてアクセスされたら alpha へ、`beta.mc.example.com` としてアクセスされたら beta へ接続できる状態まで持っていきます。

## 実現

まずはじめに Nginx を TCP に対応させて動かすことを検討しましたが、[TCP の特性上 nginx を使ってアクセス先によって振り分けることが難しい](https://forum.nginx.org/read.php?2,263208,263217#msg-263217)らしく断念しました。

今回の内容を実現するには itzg 氏が開発されている [mc-router](https://github.com/itzg/mc-router) を使っていきます。itzg 氏はマイクラを Docker でホストするための Docker Image を作成されていることで（私の中では）有名です。

公式の方で `docker-compose.yml` が準備されているので、それをちょちょっといじって良い感じにしておきます。本当はビルドして吐き出されたものを使おうかなと思ったのですが、ビルドの途中で証明書周りのエラーが起きてうまくビルドできませんでした。Go 自体に明るくもないので妥協して Docker で動かします。

```yaml
version: "3.8"

services:
  router:
    image: itzg/mc-router:latest
    environment:
      API_BINDING: ":25564"
    ports:
        - 25565:25565
        - 25564:25564
    restart: always
    command: --mapping=alpha.mc.example.com=192.168.101.21:25565,beta.mc.example.com=192.168.101.22:25565

```

あとはこれを保存したディレクトリで `docker-compose up -d` を実行すれば起動完了です。

起動しているか試すために mc-router の REST API を叩いてみます。

```sh
$curl -H Accept:application/json localhost:25564/routes
{"alpha.mc.example.com":"192.168.101.21:25565","beta.mc.example.com":"192.168.101.22:25565"}
```

こんな感じで返ってきたらOKです。

あとは各ドメインでマイクラクライアントからアクセスを試してみてください。それぞれのワールドに接続できれば完了です。各ドメインがちゃんと振り分け用サーバー（今回の場合は `192.168.101.20`）に向いていることの確認をお忘れなく。

## マイクラ鯖を増やすとき

このフローはまだ試していませんが、README.md を読む限り `POST /routes` を叩けば再起動をすることなくマッピング情報を追加できるようです。便利ですね。
