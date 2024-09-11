import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { comments } from "../controllers/index.js";

export const commentRouter = Router();

commentRouter.use(authMiddleware);

commentRouter.post("/", comments.addComment);
commentRouter.delete("/:commentId", comments.deleteComment);