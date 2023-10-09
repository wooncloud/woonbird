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
	id = Number(id);
	let post = null;
	try {
		post = await prisma.posts.findUnique({
			where: {post_id: id},
		})
	} catch (e) {
    console.error(e)
	} finally {
    await prisma.$disconnect()
	}

	return post;
}

async function createPost(user_id, content) {
	let post = null;
	try {
		post = await prisma.posts.create({
			data: { 
				user_id, 
				content, 
			},
		})
	} catch (e) {
    console.error(e)
	} finally {
    await prisma.$disconnect()
	}

	return post;
}


export default {
	findPostMany,
	findPostOneById,
	createPost
}