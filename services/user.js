import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

async function signupUser(id, pw, name, email) {
  let user = null;

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

async function updateUser(userInfo) {
  try {
    user = await prisma.users.update({
      where: { user_id: id },
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

export default {
  signupUser,
  findUserById,
  updateUser
};
