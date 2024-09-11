import zod from "zod";
import StockPosts from "../models/stockPosts.js";
import Comments from "../models/comments.js";


const commentSchema = zod.object({
    comment: zod.string().min(1, "comment is required")
});

export const addComment = async (req, res)=>{
    const { postId } = req;
    const userId = req._id;

    const { success, error } = commentSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: error.issues
        });
    }

    const { comment } = req.body;

    try {
        console.log(postId);

        const post = await StockPosts.findOne({
            _id: postId,
            isDeleted: false
        });

        console.log(post);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = await Comments.create({
            postId,
            userId,
            comment
        });

        await StockPosts.updateOne({
            _id: postId,
            isDeleted: false
        }, {
            $push: { comments: newComment._id }
        });

        res.status(201).json({
            success: true,
            commentId: newComment._id,
            message: 'Comment added successfully'
        });

    } catch (error) {
        console.error(`error in add comment controller ${error}`);
        res.status(500).send({ message: 'Something went wrong try again or Internal Server Error' });
    }
}

export const deleteComment = async (req, res)=>{
    
    const { postId, commentId } = req.params;
    const userId = req._id;

    try {

        const post = await StockPosts.findOne({
            _id: postId,
            isDeleted: false
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = await Comments.findOne({
            _id: commentId,
            postId,
            userId
        });

        if (!comment) {
            return res.status(404).json({ message: 'comment not found or you are not the one who should be doing this action' });
        }

        await Comments.deleteOne({ _id: commentId });

        await StockPosts.updateOne({
            _id: postId,
            isDeleted: false
        }, {
            $pull: { comments: commentId }
        });

        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully'
        });

    } catch (error) {
        console.error(`Error in delete comment controller ${error}`);
        res.status(500).send({ message: 'Something went wrong try again or Internal Server Error' });
    }
}