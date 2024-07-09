import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async(req , res , next) => {

    try {
        
        const { content , postId , userId } = req.body;

        if(userId !== req.user.id)             // req.user.id => if stored in the cookie
        {
            return next(errorHandler(403 , 'You are not allowed to create this comment!'));
        }

        const newComment = new Comment({
            content,
            userId,
            postId,
        });

        await newComment.save();

        res.status(200).json(newComment);

    } catch (error) {
        next(error);
    }
}