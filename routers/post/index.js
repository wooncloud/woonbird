import express from 'express';
import { post } from "../../controllers/index.js";

const router = express.Router();

// --- post ---
// 포스트 리스트 조회
router.get('/', post.getPostList);

// 포스트 단일조회
router.get('/:id', post.getPostOne);

// 포스트 생성
router.post('/', post.createPost);

// 포스트 수정
router.put('/', post.updatePost);

// 포스트 삭제
router.delete('/', post.deletePost);


// --- like ---
// like 추가
router.post('/:id/like', (req, res) => {
    res.send('create post like');
});

// like 삭제 (이거 되나)
router.delete('/like/:id', (req, res) => {
    res.send('delete post like');
});

export default router;
