import { Router } from "express";
import { stockPosts, getStockPost } from "../controllers/index.js"
import authMiddleware from "../middlewares/authMiddleware.js";

export const stockPostRouter = Router();

stockPostRouter.get("/", getStockPost.getAllStockPosts);
stockPostRouter.get("/:postId", getStockPost.getStockPost);

stockPostRouter.use(authMiddleware);

stockPostRouter.post("/", stockPosts.createStockPost);
stockPostRouter.delete("/:postId", stockPosts.deleteStockPost);
