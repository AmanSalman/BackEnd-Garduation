import slugify from "slugify";
import { CategoryModel } from "../../../DB/models/category.model.js";
import cloudinary from './../../utls/cloudinary.js';
import { BookModel } from "../../../DB/models/book.model.js";
import { AppError } from "../../utls/AppError.js";

// export const Create = async(req,res)=>{
//     req.body.name = req.body.name.toLowerCase();
//     if(await CategoryModel.findOne({name:req.body.name})){
//         return res.staus(409).json({message:"category already exists"})
//     } 
//     req.body.slug = slugify(req.body.name);
//     const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:'ecommerce/categories'});
//     req.body.image = {secure_url, public_id}; 
//     const category = await CategoryModel.create(req.body);
//     return res.json({message:"success",category})
// }

export const Create = async (req, res,next) => {
        if (!req.file) {
            return next(new AppError(`No file attached`, 400))
        }

        req.body.name = req.body.name.toLowerCase();
        if (await CategoryModel.findOne({ name: req.body.name })) {
            return next(new AppError(`Category already exists`, 409))
        }

        req.body.slug = slugify(req.body.name);

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.AppName}/categories` });
        req.body.image = { secure_url, public_id };
        req.body.createdBY = req.user._id;
        req.body.updatedBY = req.user._id;
        const category = await CategoryModel.create(req.body);

        return res.json({ message: "success", category });
}
  
export const getAll = async (req,res)=>{
    const Categories = await CategoryModel.find().select('name image status slug');
    return res.status(200).json({message:'success', Categories});
}

export const getActive = async (req,res)=>{
    const categories = await CategoryModel.find({status:'active'}).select('name image');
    return res.status(200).json({message:'success', categories});
}  

export const getDetails = async (req,res)=>{
    const category = await CategoryModel.findById(req.params.id);
    return res.status(200).json({message:'success', category})
}

export const getbooks = async (req,res,next)=>{
    const {id} = req.params;
    const books = await BookModel.find({categoryId:id})
    return res.status(200).json({message:'success', books});

}

export const update = async (req,res,next)=>{
    const category = await CategoryModel.findById(req.params.id);
    if(!category){
        return next(new AppError(`Category not found`, 404))
    }
    category.name = req.body.name.toLowerCase();
    if(await CategoryModel.findOne({name:req.body.name, _id:{$ne:req.params.id}})){
        return next(new AppError(`category already exists`, 409))
    }
    category.slug = slugify(req.body.name);
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ecommerce/categories'
        });
        cloudinary.uploader.destroy(category.image.public_id);
        category.image = {secure_url,public_id};
    }

    category.status = req.body.status;
    await category.save();
    return res.status(200).json({message:'success',category});
} 

export const Delete = async (req,res,next)=>{
    const {id} = req.params;
    const category = await CategoryModel.findById(id);
    if(!category){
        return next(new AppError(`Category not found`, 404))
    }
    await cloudinary.uploader.destroy(category.image.public_id);
    await CategoryModel.findByIdAndDelete(id);
    return res.status(200).json({message:"success"});
}