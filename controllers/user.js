import express from "express";
import { user } from "../services/index.js";
import { hashPassword, checkHash } from "../util/passwordUtils.js";
import { isValidUserId, isValidPassword } from "../util/validationCheck.js";

const app = express();

const signup = async (req, res) => {
  try {
    const { user_id, password, name, email } = req.body;

    // 유효성 검사를 수행
    if (!isValidUserId(user_id) || !isValidPassword(password)) {
      return res
        .status(422)
        .send({ message: "Invalid username or password format." });
    }

    // 이미 존재하는 아이디인지 확인
    const userExists = await user.findUserById(user_id);
    if (userExists) {
      return res
        .status(409)
        .send({
          message: "이미 존재하는 아이디 입니다. 다른 아이디를 입력해주세요.",
        });
    }

    // 비밀번호 암호화
    const hashedPassword = await hashPassword(password);

    // 디비에 저장
    await user.signupUser(user_id, hashedPassword, name, email);

    // 회원 가입 완료 메시지
    return res
      .status(200)
      .send({ message: "회원가입 성공! 로그인을 해주세요." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "회원가입을 하는 동안 문제가 발생했습니다." });
  }
};

const login = async (req, res) => {
  try {
    const { user_id, password } = req.body;

    // 입력한 아이디로 사용자 정보를 가져옴.
    const findUser = await user.findUserById(user_id);
    if (!findUser)
      return res
        .status(401)
        .send({ message: "계정 정보가 일치하지 않습니다." });
    if (findUser.delete_date)
      return res.status(401).send({ message: "이 계정은 사용할 수 없습니다." });
    if (findUser.ban_date)
      return res
        .status(401)
        .send({ message: "이 계정은 이용중지 상태입니다." });

    // 입력된 비밀번호를 해시된 비밀번호와 비교.
    const isPasswordValid = await checkHash(password, findUser.pw);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "비밀번호 틀림" });
    }

    // 세션
    req.session.user = {
      user_id: findUser.user_id,
      name: findUser.name,
      profile_picture_url: findUser.profile_picture_url,
      email: findUser.email,
    };

    res.send(req.session.user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "로그인 중 오류 발생" });
  }
};

const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "로그아웃 중 오류 발생" });
      } else {
        res.send("logout success");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "로그아웃 중 오류 발생" });
  }
};

const getSessionUserInfo = async (req, res) => {
  const sessionUser = req?.session?.user;
  if (!sessionUser) {
    return res.status(401).send({ message: "세션이 만료되었습니다." });
  }

  const findUser = await user.findUserById(sessionUser.user_id);
  if (!findUser) {
    return res.status(404).send({ message: "세션 사용자의 정보가 없습니다." });
  }

  const { user_id, name, profile_picture_url, created_date, email } = findUser;
  res.send({ user_id, name, profile_picture_url, created_date, email });
};

const modifySessionUser = (req, res) => {
  const sessionUser = req?.session?.user;
  if (!sessionUser) {
    return res.status(401).send({ message: "세션이 만료되었습니다." });
  }

  const userInfo = {
    user_id: sessionUser.user_id,
  };

  //
};

const getUserInfo = async (req, res) => {
  // 세션이 있어야 조회가 가능할지는, 생각중.

  const {
    params: { id },
  } = req;
  const findUser = await user.findUserById(id);
  if (!findUser) {
    return res.status(404).send({ message: "사용자의 정보가 없습니다." });
  }

  const { user_id, name, profile_picture_url, email } = findUser;
  res.send({ user_id, name, profile_picture_url, email });
};

export default {
  signup,
  login,
  logout,
  getSessionUserInfo,
  modifySessionUser,
  getUserInfo,
};
