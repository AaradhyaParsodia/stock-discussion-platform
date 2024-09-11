import { Router } from "express";
import { auth, userProfile } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

export const userRouter = Router();

// ===============================================================================================================================================
/**
 * @swagger
 * /user/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with the provided details
 *     tags: 
 *      - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 token:
 *                   type: string
 *           example:
 *             success: true
 *             message: "User registered successfully"
 *             userId: "1234567890"
 *             token: "your-jwt-token"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Error'
 *       409:
 *         description: Username or email already taken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *           example:
 *             message: "Username or email already taken"
 */
userRouter.post("/auth/register", auth.registerUser);

// ===============================================================================================================================================
/**
 * @swagger
 * /user/auth/login:
 *   post:
 *     summary: Login an existing user
 *     description: Authenticates an existing user with the provided credentials and return JWT token
 *     tags:
 *        - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Error'
 *       401:
 *         description: User not found or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
userRouter.post("/auth/login", auth.loginUser);

// ===============================================================================================================================================
/**
 * @swagger
 * /v1/api/user/profile/{userId}:
 *   get:
 *     summary: Get User Profile
 *     description: Retrieves the profile of a user by their ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   default: ad2345678sdsn55db
 *                 username:
 *                   type: string
 *                   default: jane_pane
 *                 bio:
 *                   type: string
 *                   default: From Earth
 *                 profilePicture:
 *                   type: string
 *                   format: url
 *                   default: https://bucket.aws.com/2323fnj
 *         example:
 *           id: "1234567890"
 *           username: "johnDoe"
 *           bio: "From Earth"
 *           profilePicture: "https://bucket.aws.com/"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *         example:
 *           message: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *         example:
 *           message: "Something went wrong try again or Internal Server Error"
 */
userRouter.get("/profile/:userId", authMiddleware ,userProfile.getUserProfile);

// ===============================================================================================================================================

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username (optional)
 *                 minLength: 3
 *                 maxLength: 45
 *               bio:
 *                 type: string
 *                 description: New bio (optional)
 *                 maxLength: 255
 *               profilePicture:
 *                 type: string
 *                 format: url
 *                 description: New profile picture URL (optional)
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
 *       404:
 *         description: User not found
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
userRouter.put("/profile", authMiddleware, userProfile.updateUserProfile);