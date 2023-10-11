import express from 'express';

const router = express.Router();

// 유저 단일조회
router.get('/:id', (req, res) => {
	res.send('param is ' + req.params.id);
	console.log(req.params, req.query);
});

// 로그인
router.post('/', (req, res) => {
	res.send('param is ' + req.params.id);
	console.log(req.params, req.query);
});

// 회원가입
router.post('/', (req, res) => {
	res.send('wow');
});

// 유저 수정
router.put('/:id', (req, res) => {
	res.send('param is ' + req.params.id);
	console.log(req.params, req.query);
});

// 유저 삭제
router.delete('/:id', (req, res) => {
	res.send('param is ' + req.params.id);
	console.log(req.params, req.query);
});


// 사용자가 활동한 콘텐츠들
// 사용자가 작성한 포스트 조회
router.get('/posts', post.getPostOne);

// 사용자가 누른 좋아요 포스트 조회
router.get('/likes', post.getPostOne);


export default router;