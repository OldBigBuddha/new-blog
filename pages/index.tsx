import Container from '../components/container'
import Layout from '../components/layout'
import { getLastPosts } from '../lib/api'
import Head from 'next/head'
import Post from '../interfaces/post'
import PostList from '../components/post-list'
import Profile from '../components/profile'
import Links from '../components/links'

import style from '../styles/index.module.css'

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
        <div className="flex flex-col lg:grid lg:grid-rows-2 lg:grid-cols-2 mx-8">

          {/* 左カラム */}
          <section className="lg:row-start-1 lg:row-end-2 lg:col-start-1">
            <h2 className={style.index__h2}>Writer</h2>
            <Profile />
          </section>

          <section className="lg:row-start-2 lg:row-end-3 lg:col-start-1">
            <h2 className={style.index__h2}>Links</h2>
            <Links />
          </section>

          {/* 右カラム */}
          <section className="lg:row-start-1 lg:row-end-3 lg:col-start-2">
            <h2 className={style.index__h2}>New articles</h2>
            <PostList posts={lastPosts}/>
          </section>

        </div>
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
