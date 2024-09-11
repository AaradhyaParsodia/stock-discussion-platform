import zod from "zod";
import StockPosts from "../models/stockPosts.js";

const createStockPostSchema = zod.object({
    stockSymbol: zod.string().min(1, "Stock symbol is required"),
    title: zod.string().min(3, "Title must be at least 3 characters").max(45, "Title must not exceed 45 characters"),
    description: zod.string().min(5, "Description must be at least 5 characters").max(500, "Description must not exceed 500 characters"),
    tags: zod.array(zod.string().optional()).optional()
});

export const createStockPost = async (req, res)=>{
    
    const { stockSymbol, title, description, tags } = req.body;
    const { _id } = req;


    try {
        
        const { success, error } = createStockPostSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: error.issues
            });
        }

        const newPost = {
            title: title,
            description: description,
            stockSymbol: stockSymbol,
            userId: _id
        };

        if( tags.length!==0 && tags){
            newPost.tags = tags;
        }

        const post = await StockPosts.create(newPost);

        res.status(201).json({
            success: true,
            postId: post._id,
            message: "Post created successfully"
        });

    } catch (error) {
        console.error(`error in create stock post controller ${error}`);
        res.status(500).send({ message: 'Something went wrong try again or Internal Server Error' });
    }
}

export const deleteStockPost = async (req, res)=>{
    
    const { postId } = req.params;
    const { _id } = req;

    try {

        const post = await StockPosts.findOne({
            _id: postId,
            isDeleted: false,
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if(post.userId.toString() !== _id){
            return res.status(403).json({
                success: false,
                message: "Unauthorised to perform this task"
            });
        }

        const success = await StockPosts.updateOne({
            _id: postId,
            isDeleted: false
        }, {
            isDeleted: true
        })
        if (!success.modifiedCount) {
            return res.status(400).json({
                message: "Error Post Can't be deleted try again later"
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Post deleted successfully' 
        });

    } catch (error) {
        console.error(`error in create stock post controller ${error}`);
        res.status(500).send({ message: 'Something went wrong try again or Internal Server Error' });
    }
}