import express from 'express';
import { user } from "../../controllers/index.js";

const router = express.Router();

router.post('/signup', user.signup);

router.post('/login', user.login);

router.post('/logout', user.logout);

// 본인 정보 조회
router.get("/me", user.getSessionUserInfo);

// 본인 정보 수정
router.patch('/me', (req, res) => {
	res.send('param is ' + req.params.id);
	console.log(req.params, req.query);
});

// 본인 정보 삭제
router.delete('/me', (req, res) => {
	// 실제 삭제가 아니고 delete_date modify
	res.send('param is ' + req.params.id);
	console.log(req.params, req.query);
});

// 유저 단일조회
router.get('/@:id', user.getUserInfo);

// POST | /users/password | 비밀번호 찾기
// PATCH | /users/password | 비밀번호 변경

export default router;