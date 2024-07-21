import User from "../models/userModel.js";
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';


export const updateUser = async (req,res) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(403,"You can't update other's account"));
    }

    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }

        const updateUser = User.findByIdAndUpdate(
            req.body.id,
            {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture
                },
            },
            { new: true}
        );
        const {password , ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error){
        next(error);
    }
};


export const deleteUser = async(req,res) => {
    if(req.body.id == req.user.id){
        return next(errorHandler(401,"You can't delete another user."));
    }

    try{
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json('User Deleted successfully')
    } catch (error) {
        next(error);
    }
}