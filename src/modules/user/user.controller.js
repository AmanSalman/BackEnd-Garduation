import { UserModel } from "../../../DB/models/user.model.js"


export const getAll = async (req,res)=> {
    const users = await UserModel.find().select('username email phone status role');
    return res.status(200).json({message:"success",users});
}

export const Disable = async (req,res)=> {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    if(user.status === 'Disabled'){
        return res.status(400).json({message:"user already disabled"});
    }
    user.status = 'Disabled';
    user.save();
    return res.status(200).json({message:"success",user});
    
}
 
export const Activate = async (req,res)=> {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    if(user.status === 'Activated'){
        return res.status(400).json({message:"user already Activated"});
    }
    user.status = 'Activated'
    user.save()
 
    return res.status(200).json({message:"success",user});
    
}  


export const Profile = async (req,res) =>{
    const user = await UserModel.findById(req.user.id);
    return res.json ({message:'success', user})
}