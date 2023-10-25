import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import pageRouter from './routers/page.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 5000);

// ----- modules -----
// morgan : 로그 남기는 라이브러리
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    // cookie: {
    //     httpOnly: true,
    //     secure: false,
    // }
}));

// 페이징 라우팅
app.use('/', pageRouter);


// -------------------------------- ERROR HANDLER --------------------------------
// 없는 페이지인 경우 404를 띄워주는 로직
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러가 발생할 경우, 500을 내려주는 로직 (운영일 경우 정보를 보여주지 않는다.)
app.use((err, req, res, next) => {
    req.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
// -------------------------------- ERROR HANDLER --------------------------------


// listen
app.listen(app.get('port'), () => {
    console.log(app.get('port'), `번 포트에서 사용중. (http://localhost:${app.get('port')})`);
})
