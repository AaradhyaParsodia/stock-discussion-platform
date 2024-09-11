import express from "express";
import { userRouter } from "./user.js";
import { stockPostRouter } from "./stockPost.js";

export const rootRouter = express.Router();

// index route handler for user routes
rootRouter.use("/user", userRouter);
rootRouter.use("/posts", stockPostRouter);