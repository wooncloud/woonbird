import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function findPostMany() {
	let posts = null;
	try {
		posts = await prisma.posts.findMany()
	} catch (e) {
    console.error(e)
	} finally {
    await prisma.$disconnect()
	}

	return posts;
}

async function findPostOneById(id) {
	let post = null;
	try {
		post = await prisma.posts.findUnique({
			where: {
				id,
			},
		})
		console.log(post)
	} catch (e) {
    console.error(e)
	} finally {
    await prisma.$disconnect()
	}

	return post;
}

export default {
	findPostMany,
	findPostOneById
}