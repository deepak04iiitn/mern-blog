import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req , res , next) => {

    if(!req.user.isAdmin)                               // user => cookie
    {
        return next(errorHandler(403 , 'You are not aloowed to create a post!'));
    }

    if(!req.body.title || !req.body.content)
    {
        return next(errorHandler(400 , 'Please provide all required fields!'));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g , '');         // for SEO purpose its better to have slug rather than just having userid

    const newPost = new Post({
        ...req.body,
        slug,
        userId : req.user.id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);                       // status code 201 means something is created
    } catch (error) {
        next(error);
    }
}