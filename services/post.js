import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient({ log: ["query"] });

async function findPostMany() {
  let posts = null;
  try {
    posts = await prisma.posts.findMany();
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }

  return posts;
}

async function findPostOneById(id) {
  id = Number(id);
  let post = null;
  try {
    post = await prisma.posts.findUnique({
      where: { post_id: id },
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
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
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }

  return post;
}

async function updatePost(post_id, content) {
  let post = null;
  try {
    post = await prisma.posts.update({
      where: { post_id },
      data: { content },
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }

  return post;
}

async function deletePost(post_id) {
  let post = null;
	console.log(post_id);
  try {
    post = await prisma.posts.delete({
      where: { post_id },
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }

  return post;
}

export default {
  findPostMany,
  findPostOneById,
  createPost,
  updatePost,
  deletePost,
};
