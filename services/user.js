import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

/**
 * 특정 사용자가 데이터베이스에 존재하는지 확인하는 함수.
 * 
 * @param {string} id - 사용자의 고유 식별자 (사용자 ID).
 * @returns {Promise<Object|null>} - 사용자가 존재하는 경우 해당 사용자 객체를 반환하고, 존재하지 않는 경우 null을 반환하는 프로미스 객체.
 */
async function checkIfUserExists(id) {
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



export default {
  checkIfUserExists,
  signupUser
};
