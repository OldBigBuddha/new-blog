import Container from '../components/container'
import Layout from '../components/layout'
import { getLastPosts } from '../lib/api'
import Head from 'next/head'
import Post from '../interfaces/post'
import PostList from '../components/post-list'
import Profile from '../components/profile'

type Props = {
  lastPosts: Post[]
}

const Index = ({ lastPosts }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Simple is Best</title>
      </Head>
      <Container>
        <h1 className="text-4xl font-bold text-center">Simple is Best</h1>

        <section>
          <h2 className="text-xl font-bold">Writer</h2>
          <Profile />
        </section>

        <section>
          <h2 className="text-xl font-bold">New articles</h2>
          <PostList posts={lastPosts}/>
        </section>
      </Container>
    </Layout>
  )
}

export default Index

export const getStaticProps = async () => {
  const lastPosts: Post[] = getLastPosts()

  return {
    props: { lastPosts },
  }
}
