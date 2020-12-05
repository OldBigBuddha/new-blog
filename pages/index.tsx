import Container from '../components/container'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import Post from '../interfaces/post'
import PostList from '../components/post-list'

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
        <h1 className="text-4xl font-bold text-center">Simple is Best</h1>
        <p>This Blog is written by OldBigBuddha.</p>

        <section>
          <h2 className="text-xl font-bold">New articles</h2>
          <PostList posts={allPosts}/>
        </section>
      </Container>
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'slug',
  ])

  return {
    props: { allPosts },
  }
}
