//----------------new api calls --------------

import { prisma } from './db'

export const getAllPosts = async () => {
  const allPosts = await prisma.posts.findMany({
    where: {
      id: 1
    }
  })

  return JSON.stringify(allPosts)
}

// console.log('getAllPosts: ', getPosts());