import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxLength: 35
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        maxLength: 35
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 45,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        minLength: 3,
        maxLength: 45,
        index: true
    },
    bio: {
        type: String,
        trim: true,
        lowercase: true,
        maxLength: 255
    },
    profilePicture: {
        type: String,
        match: /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/,
    },
    hash: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model("Users", userSchema);