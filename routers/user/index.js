import express from 'express';
import { user } from "../../controllers/index.js";

const router = express.Router();

router.post('/signup', user.signup);

router.post('/login', (req, res) => {
	res.send('param is ' + req.params.id);
	console.log(req.params, req.query);
});

router.post('/logout', (req, res) => {
	
});

// 본인 정보 조회
router.get("/me", (req, res) => {
	
})

// 본인 정보 수정
router.put('/me', (req, res) => {
	res.send('param is ' + req.params.id);
	console.log(req.params, req.query);
});

// 본인 정보 삭제
router.delete('/me', (req, res) => {
	res.send('param is ' + req.params.id);
	console.log(req.params, req.query);
});

// 유저 단일조회
router.get('/:id', (req, res) => {
	res.send('param is ' + req.params.id);
	console.log(req.params, req.query);
});

// POST | /users/password | 비밀번호 찾기
// PATCH | /users/password | 비밀번호 변경

export default router;