import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('wow');
});

router.get('/:id', (req, res) => {
    res.send('param is ' + req.params.id);
    console.log(req.params, req.query);
});

export default router;
