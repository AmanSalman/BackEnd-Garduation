import { UserModel } from "../../../DB/models/user.model.js"
import { AppError } from "../../utls/AppError.js";


export const getAll = async (req,res)=> {
    const users = await UserModel.find().select('username email phone status role');
    return res.status(200).json({message:"success",users});
}

export const Disable = async (req,res)=> {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
        return next(new AppError(`user not found`, 404))
    }
    if(user.status === 'Disabled'){
        return next(new AppError(`user already disabled`, 400))
    }
    user.status = 'Disabled';
    user.save();
    return res.status(200).json({message:"success",user});
}
 
export const Activate = async (req,res)=> {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
        return next(new AppError(`user not found`, 404));
    }
    if(user.status === 'Activated'){
        return next(new AppError(`user already Activated`, 400))
    }
    user.status = 'Activated'
    user.save()
 
    return res.status(200).json({message:"success",user});
    
}  


export const Profile = async (req,res) =>{
    const user = await UserModel.findById(req.user.id);
    return res.json ({message:'success', user})
}