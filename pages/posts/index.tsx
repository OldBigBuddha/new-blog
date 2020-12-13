import Head from 'next/head'

import { getAllPosts } from '../../lib/api'

import Container from '../../components/container'
import Layout from '../../components/layout'
import PostList from '../../components/post-list'

import Post from '../../interfaces/post'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Simple is Best</title>
      </Head>
      <Container>
        <PostList posts={allPosts}/>
      </Container>
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts: Post[] = getAllPosts()

  return {
    props: { allPosts: allPosts },
  }
}
