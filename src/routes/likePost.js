import { Router } from "express";
import { likePost } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

export const likePostRouter = Router();

likePostRouter.use(authMiddleware);

// ===========================================================================================
/**
 * @swagger
 * /api/posts/{postId}/like:
 *   post:
 *     summary: Like a stock post
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the stock post to like
 *     responses:
 *       200:
 *         description: Post liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                   description: Success status
 *                 message:
 *                   type: string
 *                   default: 'Post liked'
 *                   description: Success message
 *       400:
 *         description: Bad request (already liked or unliked)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                   description: Success status
 *                 message:
 *                   type: string
 *                   default: Error
 *                   description: Error message
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                   description: Success status
 *                 message:
 *                   type: string
 *                   default: Error
 *                   description: Error message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                   description: Success status
 *                 message:
 *                   type: string
 *                   default: Error
 *                   description: Error message
 */
likePostRouter.post("/", likePost.like);

// ===========================================================================================
/**
 * @swagger
 * /api/posts/{postId}/like:
 *   delete:
 *     summary: Unlike a stock post
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the stock post to unlike
 *     responses:
 *       200:
 *         description: Post unliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                   description: Success status
 *                 message:
 *                   type: string
 *                   default: 'Post unliked'
 *                   description: Success message
 *       400:
 *         description: Bad request (not liked before)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                   description: Success status
 *                 message:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                   description: Success status
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                   description: Success status
 *                 message:
 *                   type: string
 *                   description: Error message
 */
likePostRouter.delete("/", likePost.unlike);