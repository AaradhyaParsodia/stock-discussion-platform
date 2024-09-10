import { Router } from "express";
import { auth, userProfile } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

export const userRouter = Router();

userRouter.post("/auth/register", auth.registerUser);
userRouter.post("/auth/login", auth.loginUser);
userRouter.get("/profile/:userId", authMiddleware ,userProfile.getUserProfile);
userRouter.put("/profile", authMiddleware, userProfile.updateUserProfile);