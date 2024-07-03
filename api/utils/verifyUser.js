import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {

  const token = req.cookies.access_token;                       // getting the token from the cookie of the browser

  if (!token) 
    {
        return next(errorHandler(401, 'Unauthorized'));
    }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    if (err) 
        {
            return next(errorHandler(401, 'Unauthorized'));
        }

    req.user = user;                 // when the user is verified by verifying the token , the user is now added to the request 
    next();                          // and then we wanna go to the next function which is updateUser

  });
};