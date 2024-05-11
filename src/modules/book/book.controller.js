import { BookModel } from "../../../DB/models/book.model.js";
import { CategoryModel } from "../../../DB/models/category.model.js";
import cloudinary from "../../utls/cloudinary.js";

export const Create  = async (req,res)=>{
    const {isbn, title, price, description, publishingHouse, categoryName} = req.body;
    if (!req.file) {
        return res.status(400).json({ message: "No file attached" });
    }
    if(!await CategoryModel.findOne({name:categoryName})){
        return res.status(404).json({message:"category not found"});
    }

    if(await BookModel.findOne({isbn: isbn})){
        return res.status(409).json({message:"book already exists"});
    }
  
    if( price <=0 ){
        return res.status(400).json({message:"price should be greater than 0"});
    }

    const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.AppName}/books` })
    req.body.image = {secure_url, public_id}
    req.body.createdBY = req.user._id;
    req.body.updatedBY = req.user._id;
    const book = await BookModel.create(req.body);
    return res.json({ message: "success", book });
}

export const getDetails = async (req,res)=>{
    const book = await BookModel.findById(req.params.id);
    return res.status(200).json({message:'success', book});
}


export const getAll = async (req,res)=>{
    const Books = await BookModel.find();
    return res.status(200).json({message:'success', Books});
}


export const Delete = async (req,res)=>{
    const {id} = req.params;
    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({message:"book not found"});
    }
    await cloudinary.uploader.destroy(book.image.public_id);
    await BookModel.findByIdAndDelete(id);
    return res.status(200).json({message:'success'});
}