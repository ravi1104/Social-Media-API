import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import cookieParser from "cookie-parser";

import swagger from 'swagger-ui-express';

import { appLevelErrorHandler } from "./src/middlewares/errorHandler.js";

import likeRouter from "./src/features/like/like.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import friendRouter from "./src/features/friends/friend.routes.js"
import commentRouter from "./src/features/comments/comment.routes.js"
import apiDocs from './swagger.json' assert {type: 'json'};

import path from "path";

const app = express();
//middleware
app.use(express.static(path.resolve('public')));

app.use(cookieParser());
app.use(express.json());

app.use("/api-docs", 
swagger.serve, 
swagger.setup(apiDocs))


//Routes
app.use("/api/user", userRouter);
app.use("/api/like", likeRouter);
app.use("/api/post",postRouter);
app.use("/api/friend",friendRouter);
app.use("/api/comment",commentRouter);

app.get('*', (req, res) => {
    res.send('Invalid URL');
});


app.use(appLevelErrorHandler);

export default app;
