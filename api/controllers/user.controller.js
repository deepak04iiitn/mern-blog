import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req , res) => {
    res.json({ message : 'API is working' });
};

export const updateUser = async(req , res , next) => {

    // we have two id's , one coming from the cookie , can be get by req.user
    // and the other from route request(userId) can be get by req.params
    // we need to verify these both id's

    if(req.user.id !== req.params.userId)                    // not authenticated , means not allowed to update
        {
            return next(errorHandler(403 , 'You are not allowed to update this user!'));
        }

    if(req.body.password)
        {
            if(req.body.password.length < 6)
                {
                    return next(errorHandler(400 , 'Password must be at least 6 characters!'));
                }

            req.body.password = bcryptjs.hashSync(req.body.password , 10);
        }

        if (req.body.username) {

            if (req.body.username.length < 7 || req.body.username.length > 20) {
              return next(
                errorHandler(400, 'Username must be between 7 and 20 characters')
              );

            }

            if (req.body.username.includes(' ')) {
              return next(errorHandler(400, 'Username cannot contain spaces'));
            }

            if (req.body.username !== req.body.username.toLowerCase()) {
              return next(errorHandler(400, 'Username must be lowercase'));
            }

            if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
              return next(
                errorHandler(400, 'Username can only contain letters and numbers')
              );
            }

          }

          try {

            const updatedUser = await User.findByIdAndUpdate(
              req.params.userId,
              {
                $set: {
                  username: req.body.username,                   // if there is username update it , if there is email , update it and so on...
                  email: req.body.email,
                  profilePicture: req.body.profilePicture,
                  password: req.body.password,
                },
              },
              { new: true }                                    // in order to sent the updated information
            );

            const { password, ...rest } = updatedUser._doc;        // we want to send this updated user without password
            res.status(200).json(rest);

          } catch (error) {
            next(error);
          }
}