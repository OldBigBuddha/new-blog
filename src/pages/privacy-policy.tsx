import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import { Box, Heading, Text, Link } from '@chakra-ui/react';

const PrivacyPolicy: React.FC = () => (
  <Layout>
    <Head>
      <title>Privacy Policy | Simple is Best</title>
    </Head>
    <Container>
      <Box className="max-w-2xl mx-auto">
        <Heading as="h1" fontSize="3xl"  textAlign="center">プライバシーポリシー及び免責事項</Heading>

        <Box as="article">
          <Heading fontSize="2xl" >プライバシーポリシー</Heading>
          <Text>読者の皆様が「Simple is Best（<Link href="https://oldbigbuddha.dev/">https://oldbigbuddha.dev/</Link>）」（以下、当ブログ。）をご利用になる際には、事前に以下の事項をお読みいただき、同意された場合にのみご利用ください。本ページでは当ブログに掲載される広告や、使用しているアクセス解析ツールについて記載しています。</Text>

          <Box as="section" marginY={4}>
            <Heading as="h3" fontSize="xl"  marginBottom={4}>当ブログが使用しているアクセス解析ツールについて</Heading>
            <Text>当ブログでは、Google 社が提供するWEBページ用アクセス解析ツール「Google アナリティクス」を利用しています。Google アナリティクスは、トラフィックデータの収集のために Cookie を使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能は Cookie を無効にすることで収集を拒否できます、お使いのブラウザの設定をご確認ください。Google アナリティクスの規約に関して、詳しくは「<Link href="https://www.google.com/analytics/terms/jp.html">Google アナリティクス利用規約</Link>」をご確認ください。</Text>
          </Box>

          <Box as="section" marginY={4}>
            <Heading as="h3" fontSize="xl"  marginBottom={4}>当ブログに掲載されている広告について</Heading>

            <Box as="section" marginY={4}>
              <Heading as="h4" fontSize="lg" >Google Adsense（グーグル アドセンス）</Heading>
              <Text>当ブログでは第三者配信の広告サービス「Google Adsense グーグルアドセンス」を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するために Cookie を使用することがあります。Cookie を無効にする設定および Google アドセンスに関する詳細は「<Link href="https://policies.google.com/technologies/ads?hl=ja">広告 – ポリシーと規約 – Google</Link>」をご覧ください。</Text>
            </Box>

            <Box as="section" marginY={4}>
              <Heading as="h4" fontSize="lg" >Amazonアソシエイト</Heading>
              <Text>当ブログは、Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイト宣伝プログラムである、「Amazonアソシエイト・プログラム」の参加者です。</Text>
            </Box>

          </Box>

          <Box as="section" marginY={4}>
            <Heading as="h3" fontSize="xl"  marginBottom={4}>プライバシーポリシーの変更について</Heading>
            <Text>当ブログは、個人情報に関して適用される日本の法令を遵守するとともに、本ページの内容を適宜見直しその改善に努めます。そのため、予告なく変更される場合があります。常に最新の内容をご確認いただきますようお願いいたします。 修正された最新のプライバシーポリシーは常に本ページにて開示されます。</Text>
          </Box>

        </Box>
        <Box as="section" marginY={4}>
          <Heading fontSize="2xl" >免責事項</Heading>
          <Text>当ブログで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡ください。確認後、対応させて頂きます。</Text>
          <Text>当ブログに存在する創作物は、別途明示されたものを除きすべて CC BY-SA 4.0 とします。また、ブログそのもののソースコードは MIT License とします。著作権表記については GitHub にホストしている README.md をご覧ください。</Text>
          <Text>当ブログからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</Text>
          <Text>当ブログに掲載された内容によって生じた損害等の一切の責任を負いかねます。</Text>
          <Text>あらかじめご了承ください。</Text>
        </Box>
      </Box>
  </Container>
</Layout>
)

export default PrivacyPolicy;