import { Router } from "express";
import { likePost } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

export const likePostRouter = Router();

likePostRouter.use(authMiddleware);

likePostRouter.post("/", likePost.like);
likePostRouter.delete("/", likePost.unlike)