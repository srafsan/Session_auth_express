import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser() {
  // ... you will write your Prisma Client queries here
  const user = await prisma.user.create({
    data: {
      email: 'rahim@prisma.io',
      name: 'Rahim',
      password: 'secret'
    },
  })
}
