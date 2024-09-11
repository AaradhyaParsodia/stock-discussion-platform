import StockPosts from "../models/stockPosts.js";

export const like = async (req, res)=>{

    const { postId } = req;
    const userId = req._id;

    try {

        const post = await StockPosts.findOne({
            _id: postId,
            isDeleted: false
        });

        if (!post) {
            return res.status(404).json({ 
                message: 'Post not found' 
            });
        }

        if (post.likedBy.includes(userId)) {
            return res.status(400).json({ 
                message: 'You have already liked this post' 
            });
        }

        if (post.unlikedBy.includes(userId)) {
            
            await StockPosts.updateOne({ 
                _id: postId 
            }, { 
                $pull: { 
                    unlikedBy: userId 
                } 
            });

        }

        await StockPosts.updateOne({ 
            _id: postId 
        }, { 
            $inc: { 
                likesCount: 1 
            }, 
            $push: 
            { 
                likedBy: userId 
            } 
        });

        res.status(200).json({
            success: true,
            message: 'Post liked'
        });

    } catch (error) {
        console.error(`error in like post controller ${error}`);
        res.status(500).send({ message: 'Something went wrong try again or Internal Server Error' });
    }
}

export const unlike = async (req, res)=>{
    const { postId } = req.params;
    const userId = req._id;

    try {

        const post = await StockPosts.findOne({
            _id: postId,
            isDeleted: false
        });

        if (!post) {
            
            return res.status(404).json({ 
                message: 'Post not found' 
            });

        }

        if (!post.likedBy.includes(userId)) {
            
            return res.status(400).json({ 
                message: 'You have not liked this post' 
            });

        }

        await StockPosts.updateOne({ 
            _id: postId 
        }, { 
            $inc: { 
                likesCount: -1 
            }, 
            $pull: { 
                likedBy: userId 
            } 
        });

        if (!post.unlikedBy.includes(userId)) {
            
            await StockPosts.updateOne({ 
                _id: postId 
            }, { 
                $push: { 
                    unlikedBy: userId 
                } 
            });

        }

        res.status(200).json({
            success: true,
            message: 'Post unliked'
        });

    } catch (error) {

        console.error(`error in unlike post controller ${error}`);
        res.status(500).send({ 
            message: 'Something went wrong try again or Internal Server Error' 
        });

    }
}