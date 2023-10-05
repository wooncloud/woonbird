import express from 'express';
import userRouter from './user/index.js';
import postRouter from './post/index.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('welcome');
})

router.use('/user', userRouter);

router.use('/post', postRouter);

export default router;