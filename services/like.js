import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });


async function createLike(post_id) {
    let like = null;
    try {
        like = await prisma.likes.create({
            data: { post_id, },
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }

    return like;
}

async function deleteLike(like_id) {
    let like = null;
    try {
        like = await prisma.likes.delete({
            where: { like_id },
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }

    return like;
}

export default {
    createLike, deleteLike
}