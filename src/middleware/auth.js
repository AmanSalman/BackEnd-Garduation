import { UserModel } from "../../DB/models/user.model.js";
import jwt from 'jsonwebtoken';
import { AppError } from "../utls/AppError.js";

export  const roles = {
    Admin:'Admin',
    User:'User'
}

export const auth = (roleAccess=[])=>{
    return async (req,res,next)=>{
        const {authorization} = req.headers;
        console.log(authorization)
        if(!authorization || !authorization.startsWith(process.env.BEARERTOKEN)){
            return next(new AppError(`invalid authorization`, 401))
          } 
          
        const token = authorization.split(process.env.BEARERTOKEN)[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        if(!decoded) {
            return next(new AppError(`invalid authorization`, 401))
        }

        const user = await UserModel.findById(decoded.id);
        if(!user) {
            return next(new AppError(`user not found`, 404))
        } 

        console.log(roleAccess.includes(user.role))
        if(roleAccess.includes(user.role)){
            req.user = user;
            return next();
        }

        // req.user = user;
        // next();

       return next(new AppError(`access denied`, 403))
    }
}