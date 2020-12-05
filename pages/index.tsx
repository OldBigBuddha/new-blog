import Container from '../components/container'
import Layout from '../components/layout'
import Header from '../components/header'
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
        <Header />
        <div className="grid grid-rows-2 grid-cols-2 mx-8">

          {/* 左カラム */}
          <section className="row-start-1 row-end-2 col-start-1">
            <h2 className={style.index__h2}>Writer</h2>
            <Profile />
          </section>

          <section className="row-start-2 row-end-3 col-start-1">
            <h2 className={style.index__h2}>Links</h2>
            <Links />
          </section>

          {/* 右カラム */}
          <section className="row-start-1 row-end-3 col-start-2">
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
