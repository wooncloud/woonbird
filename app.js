import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();
const pageRouter = require('./routes/page');

const app = express();
app.use('port', process.env.PORT || 8000);

app.use(morgan('dev'));