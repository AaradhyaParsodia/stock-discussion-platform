import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Users from "../models/users.js";

const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = zod.object({
    firstName: zod.string().max(35).optional(),
    lastName: zod.string().max(35).optional(),
    username: zod.string().min(3).max(45),
    email: zod.string().email().max(45),
    bio: zod.string().max(255).optional(),
    profilePicture: zod.string().url().optional(),
    password: zod.string().min(6).max(18)
});


export const registerUser = async (req, res)=>{
    const body = req.body;
    const { username, email, password } = req.body;

    try {
        const { success, error } = userSchema.safeParse(body);

        if (!success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: error.issues
            });
        }
        
        console.log('okay');
        const isExistingUser = await Users.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
        
        if (isExistingUser) {
            return res.status(409).json({
                message: "Username or email already taken"
            });
        }

        // const token = jwt.sign({
        //     username: username
        // }, JWT_SECRET);

        const salt = await bcrypt.genSalt(10);
        
        // using hashing for password storage 
        const hash = await bcrypt.hash(password, salt);

        // console.log('okay' + hashs);
        const newUser = await Users.create({
            firstName: body.firstName || username,
            lastName: body.lastName || null,
            username: username,
            email: email,
            bio: body.bio || null,
            profilePicture: body.profilePicture || null,
            hash: hash
        });

        const token = jwt.sign({ 
            userId: newUser._id, 
            username: username, 
            email: email
        }, JWT_SECRET, { 
            expiresIn: '8h'
        });

        res.status(201).json({
            message: "User created successfully",
            userId: newUser._id,
            token: token
        });

    } catch (error) {
        console.error(`error in register user controller ${error}`);
        res.status(500).send({ message: 'Something went wrong try again or Internal Server Error' });
    }
}

export const loginUser = (req, res)=>{

}