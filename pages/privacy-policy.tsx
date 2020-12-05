import Container from '../components/container'
import Layout from '../components/layout'
import Header from '../components/header'
import Head from 'next/head'

const PrivacyPolicy: React.FC = () => (
  <Layout>
    <Head>
      <title>Privacy Policy | Simple is Best</title>
    </Head>
    <Container>
      <Header />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center">プライバシーポリシー及び免責事項</h1>

        <article>
          <section>
            <h2>プライバシーポリシー</h2>
            <p>読者の皆様が「Simple is Best（<a href="https://oldbigbuddha.dev/">https://oldbigbuddha.dev/</a>）」（以下、当ブログ。）をご利用になる際には、事前に以下の事項をお読みいただき、同意された場合にのみご利用ください。本ページでは当ブログに掲載される広告や、使用しているアクセス解析ツールについて記載しています。</p>

            <section>
              <h3>当ブログが使用しているアクセス解析ツールについて</h3>
              <p>当ブログでは、Google 社が提供するWEBページ用アクセス解析ツール「Google アナリティクス」を利用しています。</p>
              <p>Google アナリティクスは、トラフィックデータの収集のために Cookie を使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能は Cookie を無効にすることで収集を拒否できます、お使いのブラウザの設定をご確認ください。Google アナリティクスの規約に関して、詳しくは「<a href="https://www.google.com/analytics/terms/jp.html">Google アナリティクス利用規約</a>」をご確認ください。</p>
            </section>

            <section>
              <h3>当ブログに掲載されている広告について</h3>

              <section>
                <h4>Google Adsense（グーグル アドセンス）</h4>
                <p>当ブログでは第三者配信の広告サービス「Google Adsense グーグルアドセンス」を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するために Cookie を使用することがあります。Cookie を無効にする設定および Google アドセンスに関する詳細は「<a href="https://policies.google.com/technologies/ads?hl=ja">広告 – ポリシーと規約 – Google</a>」をご覧ください。</p>
              </section>

              <section>
                <h4>Amazonアソシエイト</h4>
                <p>当ブログは、Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイト宣伝プログラムである、「Amazonアソシエイト・プログラム」の参加者です。</p>
              </section>

            </section>

            <section>
              <h3>プライバシーポリシーの変更について</h3>
              <p>当ブログは、個人情報に関して適用される日本の法令を遵守するとともに、本ページの内容を適宜見直しその改善に努めます。そのため、予告なく変更される場合があります。常に最新の内容をご確認いただきますようお願いいたします。 修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>
            </section>

          </section>
          <section>
            <h2>免責事項</h2>
            <p>当ブログで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡ください。確認後、対応させて頂きます。</p>
            <p>当ブログに存在する創作物は、別途明示されたものを除きすべて CC BY-SA 4.0 とします。また、ブログそのもののソースコードは MIT License とします。著作権表記については GitHub にホストしている README.md をご覧ください。</p>
            <p>当ブログからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</p>
            <p>当ブログに掲載された内容によって生じた損害等の一切の責任を負いかねます。</p>
            <p>あらかじめご了承ください。</p>
          </section>
        </article>
      </div>
  </Container>
</Layout>
)

export default PrivacyPolicy;