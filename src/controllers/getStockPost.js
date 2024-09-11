import StockPosts from "../models/stockPosts.js";

export const getAllStockPosts = async (req, res)=>{
    
    const { stockSymbol, tags, sortBy, page = 1, limit = 10 } = req.query;

    try {

        let query = StockPosts.find({ isDeleted: false });

        if (stockSymbol) {
            query = query.where('stockSymbol', stockSymbol);
        }

        if (tags) {
            query = query.where('tags').in(tags.split(','));
        }

        if (sortBy === 'date') {
            query = query.sort({ createdAt: -1 });
        } else if (sortBy === 'likes') {
            query = query.sort({ likesCount: -1 });
        }

        const offset = (page - 1) * limit;
        const totalPosts = await StockPosts.countDocuments({ isDeleted: false });

        query.skip(offset).limit(limit);
        
        const posts = await query.select('_id stockSymbol title description likesCount createdAt');

        const totalPages = Math.ceil(totalPosts / limit);

        res.status(200).json({
            posts,
            metadata: {
                totalCount: totalPosts,
                currentPage: page,
                totalPages,
                limit
            }
        });

    } catch (error) {
        console.error(`error in get all stock posts controller ${error}`);
        res.status(500).send({ message: 'Something went wrong try again or Internal Server Error' });
    }
}

export const getStockPost = async (req, res)=>{

    const { postId } = req.params;

    try {

        const post = await StockPosts.findOne({
            _id: postId,
            isDeleted: false
        })
        .populate({
            path: 'comments',
            select: '_id userId comment createdAt',
            populate: {
                path: 'userId',
                select: '_id username'
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const response = {
            postId: post._id,
            stockSymbol: post.stockSymbol,
            title: post.title,
            description: post.description,
            likesCount: post.likesCount,
            comments: post.comments.map(comment => ({
                commentId: comment._id,
                userId: comment.userId._id,
                username: comment.userId.username,
                comment: comment.comment,
                createdAt: comment.createdAt
            }))
        };

        res.status(200).json(response);

    } catch (error) {
        console.error(`error in get a stock post by postId controller ${error}`);
        res.status(500).send({ message: 'Something went wrong try again or Internal Server Error' });
    }
}