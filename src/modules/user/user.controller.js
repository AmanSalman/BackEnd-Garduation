import { UserModel } from "../../../DB/models/user.model.js"


export const getAll = async (req,res)=> {
    const users = await UserModel.find();
    return res.status(200).json(users);
}