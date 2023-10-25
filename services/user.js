import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

async function signupUser(id, pw, name, email) {
  let user = null;

  // TODO 누락건 : 사용자 이름, 이메일

  try {
    user = await prisma.users.create({
      data: {
        user_id: id, pw, name, email
      },
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }

  return user;
}

async function findUserById(id) {
  let user = null;
  try {
    user = await prisma.users.findUnique({
      where: { user_id: id },
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }

  return user;
}

export default {
  signupUser,
  findUserById,
};
