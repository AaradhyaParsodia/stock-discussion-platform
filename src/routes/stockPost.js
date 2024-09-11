import { Router } from "express";
import { stockPosts, getStockPost } from "../controllers/index.js"
import authMiddleware from "../middlewares/authMiddleware.js";

export const stockPostRouter = Router();

// ============================================================================================
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all stock posts with filtering and sorting options
 *     tags: [StockPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: stockSymbol
 *         schema:
 *           type: string
 *         description: Filter by stock symbol (optional)
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Filter by tags (comma-separated, optional)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date, likes]
 *         description: Sort by creation date or number of likes (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of posts per page for pagination (optional)
 *         example: {
 *            "posts": [
 *              {
 *                "stockSymbol": "AAPL",
 *                "title": "Apple Stock Discussion",
 *                "description": "Discussion about Apple stock performance",
 *                "tags": [
 *                  "tech",
 *                  "stocks"
 *                ],
 *                "likesCount": 0,
 *                "createdAt": "2023-10-01T12:00:00Z"
 *              }
 *            ],
 *            "metadata": {
 *              "totalCount": 1,
 *              "currentPage": 1,
 *              "totalPages": 1,
 *              "limit": 10
 *            }
 *         }
 *     responses:
 *       200:
 *         description: List of stock posts with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StockPost'
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     totalCount:
 *                       type: integer
 *                       default: 1
 *                       description: Total number of posts
 *                     currentPage:
 *                       type: integer
 *                       default: 1
 *                       description: Current page number
 *                     totalPages:
 *                       type: integer
 *                       default: 1
 *                       description: Total number of pages
 *                     limit:
 *                       type: integer
 *                       default: 10
 *                       description: Number of posts per page
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
stockPostRouter.get("/", getStockPost.getAllStockPosts);


// ============================================================================================
/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get a single stock post with comments
 *     tags: [StockPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the stock post to retrieve
 *         example: {
 *             "post": {
 *               "stockSymbol": "AAPL",
 *               "title": "Apple Stock Discussion",
 *               "description": "Discussion about Apple stock performance",
 *               "tags": [
 *                 "tech",
 *                 "stocks"
 *               ],
 *               "likesCount": 0,
 *               "createdAt": "2023-10-01T12:00:00Z"
 *             },
 *             "comments": [
 *               {
 *                 "commentId": "1234567890",
 *                 "userId": "1234567890",
 *                 "comment": "Great discussion!",
 *                 "createdAt": "2023-10-01T12:00:00Z"
 *               }
 *             ]
 *         }
 *     responses:
 *       200:
 *         description: Stock post details with comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/StockPost'
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                 message:
 *                   type: string
 *                   description: Error message
 */
stockPostRouter.get("/:postId", getStockPost.getStockPost);

stockPostRouter.use(authMiddleware);

// ============================================================================================
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new stock post
 *     tags: [StockPosts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createPost'
 *           example: {
 *             "stockSymbol": "AAPL",
 *             "title": "Title Heading",
 *             "description": "Description of the post",
 *             "tags": [
 *               [
 *                 "Tech",
 *                 "Stock"
 *               ]
 *             ]
 *           }
 *     responses:
 *       201:
 *         description: Stock post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success status
 *                 postId:
 *                   type: string
 *                   description: ID of the newly created post
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Error details
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
stockPostRouter.post("/", stockPosts.createStockPost);

// ============================================================================================

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a stock post
 *     tags: [StockPosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the stock post to delete
 *     responses:
 *       200:
 *         description: Stock post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success status
 *                 message:
 *                   type: string
 *                   default: Post deleted successfully
 *                   description: Success message
 *       403:
 *         description: Unauthorized to delete the post
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
 *                 message:
 *                   type: string
 *                   default: Error
 *                   description: Error message
 *       400:
 *         description: Error deleting the post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   deafult: Error
 *                   description: Error message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: Error
 *                   description: Error message
 */
stockPostRouter.delete("/:postId", stockPosts.deleteStockPost);
