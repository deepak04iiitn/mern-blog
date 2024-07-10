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


export const getPostComments = async(req , res , next) => {

    try {
        
        const comments = await Comment.find({ postId : req.params.postId }).sort({
            createdAt : -1,                                                                  // we want to show the newest one first
        });

        res.status(200).json(comments);
        
    } catch (error) {
        next(error);
    }
}


export const likeComment = async(req , res , next) => {

    try {
        
        const comment = await Comment.findById(req.params.commentId);

        if(!comment)
        {
            return next(errorHandler(404 , 'Comment not found!'));
        }

        const userIndex = comment.likes.indexOf(req.user.id);              // in the array of likes , we want to check if we have any user with this userID 

        if(userIndex === -1)
        {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);                              // if not found pushing the user in the likes array
        }
        else
        {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex , 1);                          // if found removing the user
        }

        await comment.save();
        res.status(200).json(comment);

    } catch (error) {
        next(error);
    }
}