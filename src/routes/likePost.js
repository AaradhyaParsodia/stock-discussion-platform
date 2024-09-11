import { Router } from "express";
import { likePost } from "../controllers/index.js";

export const likePostRouter = Router();

likePostRouter.post("/", likePost.like);
likePostRouter.delete("/", likePost.unlike)