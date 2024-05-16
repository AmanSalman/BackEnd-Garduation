import slugify from "slugify";
import { BookModel } from "../../../DB/models/book.model.js";
import { CategoryModel } from "../../../DB/models/category.model.js";
import cloudinary from "../../utls/cloudinary.js";


export const Create = async (req, res) => {
    try {
        const { title, price, discount, categoryId } = req.body;
        
        const checkCategory = await CategoryModel.findById(categoryId);
        if (!checkCategory) {
            return res.status(404).json({ message: "category not found" });
        }

        req.body.finalPrice = price - ((price * (discount || 0)) / 100);
 
        const mainImageUpload = await cloudinary.uploader.upload(req.files.mainImage[0].path, {folder: `${process.env.AppName}/books/${title}/Main`});
        const mainImage = { secure_url: mainImageUpload.secure_url, public_id: mainImageUpload.public_id };
        req.body.mainImage = mainImage;

        const subImages = [];
        for (const file of req.files.subImages) {
            const subImageUpload = await cloudinary.uploader.upload(file.path, {folder: `${process.env.AppName}/books/${title}/Sub`});
            const subImage = { secure_url: subImageUpload.secure_url, public_id: subImageUpload.public_id };
            subImages.push(subImage);
        }
        req.body.subImages = subImages;

        const book = await BookModel.create(req.body);
        return res.status(201).json({ message: "success", book });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
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


export const Update = async (req,res)=>{
    const book = await BookModel.findById(req.params.id);
    if(!book){
        return res.status(404).json({message:"Book not found"})
    }

    book.title = req.body.title.toLowerCase();

    if(await BookModel.findOne({title:req.body.title, categoryName:req.body.categoryName, _id:{$ne:req.params.id}})){
        return res.status(409).json({message:"book already exists"});
    }

    book.slug = slugify(req.body.title);

    if(req.body.isbn) {
    book.isbn = req.body.isbn;
    }

    if(req.body.price && req.body.price>0){
        book.price = req.body.price;
    }

    if(req.body.description){
        book.description = req.body.description;
    }

    if(req.body.publishingHouse){
        book.publishingHouse = req.body.publishingHouse;
    }

    const category = await CategoryModel.findOne({name:req.body.categoryName});
    if(!category) {
    return res.status(404).json({message:"category not found"});
    }

    book.categoryName = req.body.categoryName;
    
    if(req.file){
        cloudinary.uploader.destroy(book.image.public_id);
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.AppName}/books`
        });
        book.image = {secure_url,public_id};
    }

    // book.status = req.body.status;
    await book.save();
    return res.status(200).json({message:'success',book});
}