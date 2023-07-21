import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
// import { getAllPosts, getPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import { prisma } from '../db'
import { useState, useEffect } from 'react'

type Props = {
  allPosts: Post[]
}

  async function main() {
    const post = await prisma.posts.findMany({
      where: {
        NOT: {
          content: 'N/A',
          draft: false
        },
      }
    })
    return post
}
// main()
// .then(results => console.log('results: ', results[5]))
// .catch(e => console.error(e.message))
// .finally(async () => {
//   await prisma.$disconnect()
// })

export default function Index({ allPosts }: Props) {

  const [posts, setPosts] = useState([])

  console.log('posts: ', posts[0])

  const heroPost = posts[0]
  // const morePosts = posts.slice(1)

  useEffect(() => {
    main()
    .then(results => {
      setPosts(results)
    })}, [])

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
