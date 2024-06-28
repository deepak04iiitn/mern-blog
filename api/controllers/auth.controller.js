import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async(req , res , next) => {              // we use async when we are taking/fetching some data from the database

    const { username , email , password } = req.body;      // getting them separately from req.body

    if(!username || !email || !password || username === '' || email === '' || password === '')
        {
            next(errorHandler(400 , 'All fields are required'));
        }

        const hashedPassword = bcryptjs.hashSync(password , 10);

        const newUser = new User({
            username,
            email,
            password : hashedPassword,
        })

        try {
            await newUser.save();
            res.json('Signup successfull');
        } catch (error) {
            next(error);
        }
}

export const signin = async(req , res , next) => {

    const { email , password } = req.body;

    if(!email || !password || email === '' || password === '')
        {
            next(errorHandler(400 , 'All fields are required'));
        }

    try {
        
        const validUser = await User.findOne({ email });

        if(!validUser)
            {
                return next(errorHandler(404 , 'Wrong Credentials!'));
            }

        const validPassword = bcryptjs.compareSync(password , validUser.password);

        if(!validPassword)
            {
                return next(errorHandler(400 , 'Wrong Credentials!'));
            }


        // now if everything is correct both email and password , we need to authenticate our user
        // we will do it by a package called json web token

        const token = jwt.sign(
            {
                id : validUser._id
            },
            process.env.JWT_SECRET
        );

        const { password : pass , ...rest } = validUser._doc;       // we do not want to send back the password , thats why we are separating it 

        res.status(200).cookie('access_token' , token , {
            httpOnly : true
        }).json(rest);


    } catch (error) {
        next(error);
    }
}