import express from "express";
import { userRouter } from "./user.js";
import { stockPostRouter } from "./stockPost.js";
import { commentRouter } from "./comments.js";
import { likePostRouter } from "./likePost.js";

export const rootRouter = express.Router();

// index route handler for user routes
rootRouter.use("/user", userRouter);
rootRouter.use("/posts", stockPostRouter);
rootRouter.use("/posts/:postId/comments", (req, _, next) => {
    req.postId = req.params.postId;
    next();
}, commentRouter);
rootRouter.use("/posts/:postId", (req, _, next) => {
    req.postId = req.params.postId;
    next();
}, likePostRouter);