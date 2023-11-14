import express from 'express';
import { user } from "../../controllers/index.js";

const router = express.Router();

router.post('/signup', user.signup);

router.post('/login', user.login);

router.post('/logout', user.logout);

// 본인 정보 조회
router.get("/me", user.getSessionUserInfo);

// 본인 정보 수정
router.patch('/:id', user.modifySessionUser);

// 사용자 삭제 처리
router.delete('/:id', user.deleteUser);

// 사용자 밴 처리
router.patch('/ban/:id', user.banUser);

// 유저 단일조회 https://woonbird.com/user/@wooncloud
router.get('/@:id', user.getUserInfo);

// POST | /users/password | 비밀번호 찾기
// PATCH | /users/password | 비밀번호 변경

export default router;