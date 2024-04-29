import slugify from "slugify";
import { CategoryModel } from "../../../DB/models/category.model.js";
import cloudinary from './../../utls/cloudinary.js';

export const Create = async(req,res)=>{
    const name = req.body.name.toLowerCase();
    if(await CategoryModel.findOne({name})){
        return res.staus(409).json({message:"category already exists"})
    } 
    req.body.slug = slugify(req.body.name);
    const {secure_url,public_id} = cloudinary.uploader.upload(req.file.path,{folder:'ecommerce/categories'});

    return res.json({message:"success"})
}