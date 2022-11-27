---
title: LinkedList の真ん中の要素を取得する
date: 2022-11-27
---

友人が LeetCode をやっているのに触発されて少し触ってみたのですが、早速 easy のとある問題で理解に苦しむ解法が出てきたので、メモとして残しておきます。最近仕事で Go を書く必要があるので LeetCode は Go で解ます。

今回はじめて LeetCode の問題に挑戦したのですが、思った以上にストレートだなと感じました（触る前は AtCoder みたいな文章問題を勝手に想像していました）。


## 問題

今回解法の理解に苦戦した問題は [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) です。単方向リスト（singly linked list）が入力されるので、その中間要素（偶数個の場合は2つある中間要素の内2つ目）を返せというとてもシンプルなものです。
Go でこの問題を解く際は以下の構造のデータとして先頭要素を引数として受け取ることになります。

```go
type ListNode struct {
  Val int
  Next *ListNode
}
```

## 自分が思いついた解法

問題文を読んで真っ先に思いついた方法としてはリストの総数を数えた上でその数をもとに中間要素を取得するというものです。もっとも安直ですね（制約として要素数の上限は100と決まっていたので愚直に書いても問題なし）。

[提出したコード](https://leetcode.com/submissions/detail/850002005/):

```go
func middleNode(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }

    size := 1
    for current := head; current.Next != nil; size++ {
        current = current.Next
    }

    middleIndex := size / 2

    middleNode := head
    for i := 0; i < middleIndex; i++ {
        middleNode = middleNode.Next
    }

    return middleNode
}
```

## Two pointer

LeetCode には各問題に `Discuss` というタブがあり、そこには先人たちが自分たちの解法を載せてくれています。この問題ではポインタを2つ用いて解く手法が主流だったのですが、そのコードを見ただけではなぜそのコードで問題が解けるのか直ぐには理解できませんでした。

```go
func middleNode(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }

    fast := head
    slow := head

    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }

    return slow
}
```

他の記事とか参考にしつつようやく理解したので、自分なりの解説を置いておきます。

### 自分なりの理解

以下の文章は↑のコードを初めて見たときの自分に見せたい文章を考えた結果です。

この解法の注目すべき部分は「ポインタが2つ存在し、`slow` はひとつずつ、`fast` は2つずつ参照先が移動している」ことです。これは算数的なお話ですが、`+1` の計算と `+2` の計算がまったく同じ回数行われればその結果は「2倍の差」が存在します。これを応用し、`fast` が終点まで移動できれば `slow` はその半分、すなわち中間要素を示すポインタが入手できるという訳です。

中学受験でよく見る[年齢算](https://alpha-katekyo.jp/tips/tips061/)を思い出すと理解が捗りそうですね。調べてみると「ウサギとカメアルゴリズム（Floyd's Tortoise and Hare Algorithm）」という名称で有名なようです。

### Two pointer のもうひとつの使い方

`Floyd's Tortoise and Hare Algorithm` を調べてみると今回のような LinkedList の中間要素を取得するよりも LinkedList 自体が循環していないかを検知する用途のほうが有名なようです。2つのポインターのうち、早い方が終端にたどり着くよりも先にもう一方のポインタに追いついたらそれは循環しているというわけですね。

原理的なお話は[この動画](https://youtu.be/PvrxZaH_eZ4)が分かりやすかったです。ループに入る前（x）、入ってから衝突するまでの距離（y）、衝突したところからループの入り口までの距離（z）をそれぞれ文字において立式すると最終的に `x = nc + z`（`nc` は何回ループしたか）となるのでループの開始要素まで分かるよという部分を丁寧に解説してくれていたのが自分が理解するために助かりました。映像でみるとまさにウサギとカメですね。
