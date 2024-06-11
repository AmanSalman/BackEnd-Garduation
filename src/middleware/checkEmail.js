import { UserModel } from "../../DB/models/user.model.js";
import { AppError } from "../utls/AppError.js";

export const checkEmail =  async(req,res,next)=>{
  const {email} = req.body
  if(!email){
    return res.status(400).json({message:"email is required"})
  }
  const user = await UserModel.findOne({email})
  if(user){
    return next(new AppError(`email already exist`, 409))
  }
  next()
}