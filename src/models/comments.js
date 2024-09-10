import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Posts', 
        required: true 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users', required: true 
    },
    comment: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true
});

export default mongoose.model("Comments", commentSchema);