import { Grid, GridItem, Heading } from "@chakra-ui/react"

import Container from '../components/container'
import Layout from '../components/layout'
import { getLastPosts } from '../lib/api'
import Head from 'next/head'
import Post from '../interfaces/post'
import PostList from '../components/post-list'
import Profile from '../components/profile'
import Links from '../components/links'


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
        <Grid
          templateRows="repeat(2, minmax(0, 1fr))"
          templateColumns="repeat(2, minmax(0, 1fr)"
          columnGap={10}
          rowGap={5}
          marginX={8} >

          {/* 左カラム */}
          <GridItem
            as="section"
            rowStart={1}
            rowEnd={2}
            colStart={1}>
            <Heading
              fontSize="1.25rem"
              fontWeight="bold"
              border="none"
              _before={{
                content: "''"
              }}
            >
              Writer
            </Heading>
            <Profile />
          </GridItem>

          <GridItem
            as="section"
            rowStart={2}
            rowEnd={3}
            colStart={1}>
            <Heading
              fontSize="1.25rem"
              fontWeight="bold"
              border="none"
              _before={{
                content: "''"
              }}>
              Links
            </Heading>
            <Links />
          </GridItem>

          {/* 右カラム */}
          <GridItem
            as="section"
            rowStart={1}
            rowEnd={3}
            colStart={2}>
            <Heading
              fontSize="1.25rem"
              fontWeight="bold"
              border="none"
              _before={{
                content: "''"
              }}>
              New articles
            </Heading>
            <PostList posts={lastPosts}/>
          </GridItem>

        </Grid>
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
