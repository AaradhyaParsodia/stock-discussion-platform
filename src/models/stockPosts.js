import mongoose from "mongoose";
import Users from "./users.js";
import Comments from "./comments.js";

const stockPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 45,
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 500
    },
    tags: [{
        type: String
    }],
    stockSymbol: { 
        type: String,
        required: true,
        trim: true,
        index: true 
    },
    stockSymbolURLs: {
        type: [String],
        match: /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Users
    }],
    unlikedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Users
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Comments
    }]
}, {
    timestamps: true
});

export default mongoose.model("Posts", stockPostSchema);