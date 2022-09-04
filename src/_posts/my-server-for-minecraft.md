---
title: 身内向けマイクラ鯖をDockerで構築する
date: 2021-04-18
---

3月の下旬頃から友人向けにマイクラのサーバーを建て、約1か月ほど運用を続けてきました。家に物理サーバーが一台しかないので、ほぼすべてのソフトウェアを Docker で動かしてサービスを提供しています。MineCraft もその一例です。

この記事では私が実際に使っている `docker-compose.yml` を公開し、1か月使って気がついた Tips などを紹介します。

## 利用する Docker Image

Docker で MineCraft を動かすにあたって用いるイメージは以下の2つです。

- [itzg/docker-minecraft-server: Docker image that provides a Minecraft Server that will automatically download selected version at startup](https://github.com/itzg/docker-minecraft-server)
- [itzg/docker-mc-backup: Provides a side-car container to backup itzg/minecraft-server world data](https://github.com/itzg/docker-mc-backup)

1つ目がサーバーそのもの、2つ目がバックアップ用のイメージです。バックアップ用なので、後述する配布ワールドの利用や単発的に使うサーバーでは使わなくて良いかもしれません。ここらへんは好みです。

## 実際に使っている `docker-compose.yml`

さて、本題の `docker-compose.yml` です。ポート等の設定は少し変えていますが、ほぼそのままのファイルです。

```yml
version: "3"

services:
  # Application
  mc-vanilla:
    image: itzg/minecraft-server
    ports:
      - 25565:25565
    environment:
      EULA: "TRUE"
      MEMORY: 2G
    volumes:
      - ./data:/data
      - /etc/timezone:/etc/timezone:ro
    tty: true
    stdin_open: true
    restart: always
    deploy:
      resources:
        limits:
          memory: 2.5G

  # Backup
  backup:
    image: itzg/mc-backup
    depends_on:
    - mc-vanilla
    volumes:
      - ./data:/data:ro
      - ./mc-backups:/backups
      - /etc/timezone:/etc/timezone:ro
    network_mode: "service:mc-vanilla"
```

この設定は[公式のサンプル](https://github.com/itzg/docker-minecraft-server/blob/master/examples/docker-compose-simple.yml)に少し手を加えたものとなっています。

`mc-vanilla` は起動時の最新バージョンでマイクラ鯖が構築されます。`EULA` とは「[MineCraft END USER LICENSE AGREEMENT](https://account.mojang.com/documents/minecraft_eula)」のことで、これに同意がなければ MineCraft サーバーを運用することができません。熟読した上で `"TRUE"` を設定しましょう。`MEMORY` はその名の通りサーバーのメモリ割り当て（正確には JVM オプション）です。デフォルトでは `1G` となりますが、ちょっと不安だったので `2G` にしています。今のところ4人のサーバーで問題点は報告されていません。その他細かい設定（バージョンの変更やポートの変更やなどなどたくさん）が環境変数を通じて行えますので、詳しくは[公式の README](https://github.com/itzg/docker-minecraft-server#readme) をご覧ください。

また、マイクラ鯖のコンテナにはメモリの使用量制限をかけています。`MEMORY` を設定しているので予想以上にリソースを持っていかれてしまう、ということはないのかもしれませんが念の為です。ここのメモリ上限ですが公式リポジトリの方に[ベストプラクティスとして `MEMORY`（Java Heap） + 25% が良い](https://github.com/itzg/docker-minecraft-server#user-content-memory-limit:~:text=NOTE%3A%20the%20settings%20above%20only%20set,25%25%20is%20a%20general%20best%20practice.)と記述があります。今回はヒープに 2GB を割り当てていますので 1.25 倍の 2.5 GB を上限としています。

バックアップコンテナは決められた時間（`BACKUP_INTERVAL` で設定可能、デフォルトは `24h`）で自動バックアップを行い、バックアップファイルは一定期間（`PRUNE_BACKUPS_DAYS`で設定可能、デフォルトは`7`）保存されます。もっとも気をつけたほうが良い変数は `INITIAL_DELAY` です。この値はコンテナが起動した後どれくらいで初回のバックアップを始めるかを指定するものです。MineCraft のサーバーが起動するまで（jar ファイルのダウンロード等も含めて）少し時間がかかるので、この時間はお手元の環境に合わせて変更してください。デフォルトは `2m` で、私のサーバーでは十分な数値でした。こちらのイメージもいくつか環境変数で調節ができるので上のドキュメントも合わせて[ご覧ください](https://github.com/itzg/docker-mc-backup#readme)。作者が同じなのでデフォルトの設定がベストだとは思います。

各プロパティの意味を公式リポジトリで確認してから活用するのがベストというのは言わずもがなですが、とりあえず今日（2021/04/18）現在では上のファイルをコピペすれば動くかと思います。同階層にデータ用の `data/` とバックアップ用の `mc-backups` が生成されますのでご注意ください。

## Tips: RCON クライアント

MineCraft には [RCON](https://wiki.vg/RCON) と呼ばれるマイクラ鯖管理者用の遠隔コマンド実行プロトコルが 1.9pre4 から実装されています。今回紹介したイメージでは[標準で RCON が有効](https://github.com/itzg/docker-minecraft-server#user-content-interacting-with-the-server:~:text=RCON%20is%20enabled%20by%20default)になっています。そのため、以下のコマンドで World 外からマイクラコマンドを入力できます。

```sh
docker exec {container_name} rcon-cli {MineCraft Command}
```

## Tips: MODサーバー

上で紹介したイメージは MOD サーバーも簡単に構築できます。たとえば Forge サーバーにしたい場合、環境変数として `TYPE="FORGE"` を設定すると Forge サーバーとして起動します。あとはいつも通り `mods` ディレクトリに MOD ファイルを投入するだけです。他にも Fabric や Bukkit、Spigot など有名どころには対応しているので、公式ドキュメントの[ここらへん](https://github.com/itzg/docker-minecraft-server#running-a-forge-server)からご確認ください。

私のサーバーでは Fabric サーバーとして起動し、[`Phosphor`](https://www.curseforge.com/minecraft/mc-mods/phosphor) や [`Lithium`](https://www.curseforge.com/minecraft/mc-mods/lithium) などの軽量化 MOD を導入することでゲーム性を変更することなく快適なゲーム環境を構築しています。軽量化 MOD を導入してるときとしていないときで明らかな差がメモリの使用量に出ていたので、サーバー機のリソースに不安がある方はあえて MOD サーバーとして起動しても良いかもしれませんね。軽量化 MOD のみならクライアントに導入してもらう必要もないので。余談ですが Fabric の MOD はいつも[ここ](https://github.com/comp500/fabric-serverside-mods)から探しています。

## Tips: 配布マップ

配布マップを使うための設定も存在します。が、上手く起動できる確率が低いです。これまで3つほど配布ワールドを試してきましたが、上手く起動できたのは1つだけでした。私はもともと MineCraft にとても明るいわけではないので、もしかしたら本来しないといけない下準備を忘れいていたりドキュメントの一部を誤って理解しているのかもしれません。「この配布マップだと上手くいったよ〜」という報告は大歓迎なので[僕の Twitter アカウント](https://twitter.com/OldBigBuddha)にメンションを飛ばしてください。

気をつけるべき点としては `VERSION` を適切に設定するところと、`WORLD` に適切なファイルパスを設定することです。以下に上手くいったときの `docker-compose.yml` を貼っつけておきます。

```yml
version: "3"

services:
  mc-athletic:
    image: itzg/minecraft-server
    ports:
      - 25565:25565
    volumes:
      - ./data:/data
      - ./worlds:/worlds:ro
      - /etc/timezone:/etc/timezone:ro
    environment:
      EULA: "TRUE"
      VERSION: "1.16.4"
      MODE: "adventure"
      WORLD: /worlds/athletic
    tty: true
    stdin_open: true
    restart: always
```
