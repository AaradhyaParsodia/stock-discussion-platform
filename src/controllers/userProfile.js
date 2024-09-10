import Users from "../models/users.js";
import zod from "zod";

const updateUserProfileSchema = zod.object({
    username: zod.string().min(3).max(45).optional(),
    bio: zod.string().max(255).optional(),
    profilePicture: zod.string().url().optional(),
});

export const getUserProfile = async (req, res)=>{
    const { _id } = req.params;
    
    try {

        const user = await Users.findOne({
            email: req.email,
            username: req.username,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user._id, 
            username: user.username, 
            bio: user.bio, 
            profilePicture: user.profilePicture
        });

    } catch (error) {
        console.error(`error in get User Profile controller ${error}`);
        res.status(500).send({ message: 'Something went wrong try again or Internal Server Error' });
    }
}

export const updateUserProfile = async (req, res)=>{
    const { _id } = req;
    try {

        const { success, error } = updateUserProfileSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: error.issues
            });
        }

        const update = {};

        if (req.body.username && req.body.username !== "") {
            update.username = req.body.username;
        }
        
        if (req.body.bio && req.body.bio !== "") {
            update.bio = req.body.bio;
        }
        
        if (req.body.profilePicture && req.body.profilePicture !== "") {
            update.profilePicture = req.body.profilePicture;
        }
        
        const user = await Users.findByIdAndUpdate(_id, update, { new: true });
        
        // console.log("_id ", _id);
        // console.log("update: ", update);
        // console.log("user: ",user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        

        res.status(200).json({
            success: true,
            message: 'Profile updated'
        });

    } catch (error) {
        console.error(`Error in update User Profile controller: ${error}`);
        res.status(500).send({ message: 'Something went wrong try again or Internal Server Error' });
    }
}