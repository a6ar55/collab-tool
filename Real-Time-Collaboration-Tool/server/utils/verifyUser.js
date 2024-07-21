import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyUser = async (req,res,next) => {
    if(!req.cookies.access_token){
        return next(errorHandler(403,'Unauthorised user'));
    }

     jwt.verify(req.cookies.access_token,process.env.JSON_SECRET,(err,user) => {

        if(err) return next(errorHandler(403,'Token is Invalid'));

        req.user = user;
        next();
    });
}