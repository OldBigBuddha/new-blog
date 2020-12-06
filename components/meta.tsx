import Head from 'next/head'

const Meta = () => {
  return (
    <Head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="author" content="OldBigBuddha" />
      <meta name="description" content="OJI のブログ" />

      {/* OGP */}
      {/* <meta property="og:title" content="Simple is Best" />
      <meta property="og:description" content="OJI のブログ" />
      <meta property="og:type" content="blog" />
      <meta property="og:url" content="https://oldbigbuddha.dev/" /> */}
      <meta property="og:site_name" content="Simple is Best" />

      {/* OGP:Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@OldBigBuddha" />
      {/* <meta name="twitter:url" content="https://oldbigbuddha.dev/" />
      <meta name="twitter:title" content="Simple is Best" />
      <meta name="twitter:description" content="OJI のブログ" /> */}

      <meta property="fb:app_id" content="2154307747924530" />

      {/* favicon */}
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />

      {/* Adobe Font */}
      <script dangerouslySetInnerHTML={{
        __html: `!function(e){var t,a={kitId:"ury5ymp",scriptTimeout:3e3,async:!0},c=e.documentElement,i=setTimeout(function(){c.className=c.className.replace(/\bwf-loading\b/g,"")+" wf-inactive"},a.scriptTimeout),n=e.createElement("script"),s=!1,o=e.getElementsByTagName("script")[0];c.className+=" wf-loading",n.src="https://use.typekit.net/"+a.kitId+".js",n.async=!0,n.onload=n.onreadystatechange=function(){if(t=this.readyState,!(s||t&&"complete"!=t&&"loaded"!=t)){s=!0,clearTimeout(i);try{Typekit.load(a)}catch(e){}}},o.parentNode.insertBefore(n,o)}(document);`
      }} />

    </Head>
  )
}

export default Meta
