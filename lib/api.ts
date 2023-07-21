//----------------new api calls --------------

import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

  async function getAllPosts() {
    const post = await prisma.posts.findMany({
      where: {
        NOT: {
          content: 'N/A',
        },
      }
    })
    return post
}

export function getPosts() {

  const posts = getAllPosts()
  .catch(e => console.error(e.message))
  .finally(async () => {
    await prisma.$disconnect()
  })

  return posts;
}

console.log('getAllPosts: ', getPosts());