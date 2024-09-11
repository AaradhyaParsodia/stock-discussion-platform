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
        validate: {
            validator: (value) => {
                return value.every(url => /^https?:\/\/.+?\.(jpg|jpeg|png|gif)$/.test(url));
            },
            message: 'Invalid URL format for stock symbol images'
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    likesCount: {
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
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model("Posts", stockPostSchema);