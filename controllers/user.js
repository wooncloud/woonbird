import express from "express";
import { user } from "../services/index.js";
import { hashPassword, checkHash } from "../util/passwordUtils.js";
import { isValidUserId, isValidPassword } from "../util/validationCheck.js";
import { generateIdenticonAvatar } from "../util/avatarGenerator.js";

const app = express();

/*
  # 현재 사용자 컨트롤러가 긴 상황
  > controller/user 디렉토리에 아래와 같은 컨트롤러를 두려고 함.
  - 로그인, 로그아웃, 회원가입 (authController)
  - 세션과 관련있는 컨트롤러 (sessionController)
  - 마스터 관리자가 핸들링하는 컨트롤러 (accountController)
  >> 하지만 이 프로젝트는 그렇게 공들이지 않겠다. 공부용이니까
*/

const signup = async (req, res) => {
  try {
    const { user_id, password, name, email } = req.body;

    // 유효성 검사를 수행
    if (!isValidUserId(user_id) || !isValidPassword(password)) {
      return res.status(422).send({ message: "Invalid username or password format." });
    }

    // 이미 존재하는 아이디인지 확인
    const userExists = await user.findUserById(user_id);
    if (userExists) {
      return res.status(409).send({
        message: "이미 존재하는 아이디 입니다. 다른 아이디를 입력해주세요.",
      });
    }

    // 비밀번호 암호화
    const hashedPassword = await hashPassword(password);
    // 프로필 사진
    const profileImageUrl = generateIdenticonAvatar(user_id);

    // 디비에 저장
    await user.signupUser({
      id: user_id, 
      pw: hashedPassword, 
      name, 
      email,
      profile: profileImageUrl
    });

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

// 세션 사용자 정보 가져오기
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

// 사용자 정보 가져오기
const getUserInfo = async (req, res) => {
  // TODO: 미들웨어 개발할 것
  const sessionUser = req?.session?.user;
  if (!sessionUser) {
    return res.status(401).send({ message: "세션이 만료되었습니다." });
  }

  const { params: { id }, } = req;

  const findUser = await user.findUserById(id);
  if (!findUser) {
    return res.status(404).send({ message: "사용자의 정보가 없습니다." });
  }

  const { user_id, name, profile_picture_url, email } = findUser;
  res.send({ user_id, name, profile_picture_url, email });
};

// 세션 유저 정보 변경
const modifySessionUser = async (req, res) => {
  const sessionUser = req?.session?.user;
  if (!sessionUser) {
    return res.status(401).send({ message: "세션이 만료되었습니다." });
  }

  if (req.params.id !== sessionUser.user_id) {
    return res.status(403).send({ message: "본인의 정보만 수정할 수 있습니다." });
  }

  const findUser = await user.findUserById(sessionUser.user_id);
  if (!findUser) {
    return res.status(404).send({ message: "세션 사용자의 정보가 없습니다." });
  }

  // 사용자 정보를 빈값으로 채울 때, 문제가 생길 수 있음.
  const userInfoForUpdate = { ...findUser, ...req.body };

  const result = await user.updateUser(userInfoForUpdate);
  if (result !== "") {
    console.error(result);
    res.status(500).send({ message: "서버에서 오류가 발생했습니다." });
  }

  res.send({ message: "정보가 수정 되었습니다." });
};

// 세션 정보 없이 데이터를 수정할 수 있다. 이는 마스터 관리자의 인증이 필요하다.
const modifyUser = async (req, res) => {
  // 관리자의 key 또는 관리자 세션이 필요

  const findUser = await user.findUserById(req.params.id);
  if (!findUser) {
    return res.status(404).send({ message: "사용자의 정보가 없습니다." });
  }

  const userInfoForUpdate = { ...findUser, ...req.body };

  const result = await user.updateUser(userInfoForUpdate);
  if (result !== "") {
    console.error(result);
    res.status(500).send({ message: "서버에서 오류가 발생했습니다." });
  }

  res.send({ message: "정보가 수정 되었습니다." });
};

// 유저 삭제 처리
const deleteUser = async (req, res) => {
  req.body = { 
    ...req.body,
    delete_date: new Date().toISOString()
  }
  modifyUser(req, res);
}

// 유저 밴 처리
const banUser = async (req, res) => {
  req.body = { 
    ...req.body,
    ban_date: new Date().toISOString()
  }
  modifyUser(req, res);
}

export default {
  signup,
  login,
  logout,
  getSessionUserInfo,
  getUserInfo,
  modifySessionUser,
  deleteUser,
  banUser
};
