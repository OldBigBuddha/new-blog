import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import { Box } from "@chakra-ui/react"

import Container from '../../components/container'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'

import { getAllPosts, getPostByFilename } from '../../lib/api'

import PostType from '../../interfaces/post'

type Props = {
  post: PostType
}

const Post = ({ post }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Head>
        <title>{post.title} | Simple is Best</title>

        <meta property="og:title" content={`${post.title} | Simple is Best`} />
        <meta property="og:description" content="OJI のブログ" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://oldbigbuddha.dev/post/${post.slug}`} />

        <meta name="twitter:url" content={`https://oldbigbuddha.dev/post/${post.slug}`} />
        <meta name="twitter:title" content={`${post.title} | Simple is Best`} />
        <meta name="twitter:description" content="OJI のブログ" />

        <link rel="canonical" href={`https://oldbigbuddha.dev/post/${post.slug}`} />
      </Head>
      <Container>
        <article className="mb-32 max-w-2xl mx-auto">
          <PostHeader
            title={post.title}
            date={post.date}
          />
          <Box dangerouslySetInnerHTML={{ __html: post.html }}/>
        </article>
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const post: PostType = getPostByFilename(params.slug)

  return {
    props: {
      post: post
    },
  }
}

export const getStaticPaths = async () => {
  const posts: PostType[] = getAllPosts()

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      }
    }),
    fallback: false,
  }
}
