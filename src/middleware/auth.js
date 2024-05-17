import { UserModel } from "../../DB/models/user.model.js";
import jwt from 'jsonwebtoken';

export  const roles = {
    Admin:'Admin',
    User:'User'
}

export const auth = (roleAccess=[])=>{
    return async (req,res,next)=>{
        const {authorization} = req.headers;
        console.log(authorization)
        if(!authorization || !authorization.startsWith(process.env.BEARERTOKEN)){
            return res.status(401).json({message:"invalid authorization"});
          } 
          
        const token = authorization.split(process.env.BEARERTOKEN)[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        if(!decoded) {
            return res.status(401).json({message:"unauthorized2"});
        }

        const user = await UserModel.findById(decoded.id);
        if(!user) {
            return res.status(401).json({message:"user not found"});
        } 

        console.log(roleAccess.includes(user.role))
        if(roleAccess.includes(user.role)){
            req.user = user;
            return next();
        }

        // req.user = user;
        // next();

       return res.status(403).json({message:"access denied"});
        

    }
}