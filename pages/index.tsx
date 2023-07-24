import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
// import { getAllPosts, getPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
// import { prisma } from '../db'
import { useState, useEffect } from 'react'
// axios switch over from prisma
import dynamic from 'next/dynamic'
import parse from 'html-react-parser'
import axios from 'axios'
// try prisma again
import { PrismaClient } from '@prisma/client'
// import functions from api doc
import { getAllPosts } from '../lib/api'

export const getStaticProps = async () => {
  const allPosts = await getAllPosts()
  return {props: {allPosts}}
}


type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {

  const [posts, setPosts] = useState(allPosts)

  console.log('posts: ', posts)

  const heroPost = posts[0]
  // const morePosts = posts.slice(1)

  return (
    <>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              image={heroPost.image}
              created={heroPost.created_at}
              author={heroPost.author}
              description={heroPost.description}
            />
          )}
          {/* // will want to change this so that it iterates over a certain max number of posts */}
          {/* {morePosts.length > 0 && <MoreStories morePosts={morePosts} />} */}
        </Container>
      </Layout>
    </>
  )
}

// export const getStaticProps = async () => {
//   const allPosts = await getAllPosts()
//   console.log(allPosts)

//   return {
//     props: { allPosts },
//   }
// }
