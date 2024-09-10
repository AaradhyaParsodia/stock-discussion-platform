import { Router } from "express";
import { auth } from "../controllers/index.js";

export const userRouter = Router();

userRouter.post("/auth/register", auth.registerUser);
userRouter.post("/auth/login", auth.loginUser);