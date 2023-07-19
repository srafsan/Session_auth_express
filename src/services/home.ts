import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export async function getAllUser() {
    const users = await prisma.user.findMany()
    return users
}


getAllUser()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })