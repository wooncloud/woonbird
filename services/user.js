import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

async function signupUser(userInfo) {
  let user = null;
  const {id, pw, name, email, profile} = userInfo;
  try {
    user = await prisma.users.create({
      data: {
        user_id: id,
        pw,
        name,
        email,
        profile_picture_url: profile,
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
  let result = "";
  const { user_id } = userInfo;
  try {
    const user = await prisma.users.update({
      where: { user_id },
      data: userInfo
    });
  } catch (e) {
    console.error(e);
    result = e.message;
  } finally {
    await prisma.$disconnect();
  }
  return result;
}

export default {
  signupUser,
  findUserById,
  updateUser
};
