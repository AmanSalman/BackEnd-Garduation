import slugify from "slugify";
import { BookModel } from "../../../DB/models/book.model.js";
import { CategoryModel } from "../../../DB/models/category.model.js";
import cloudinary from "../../utls/cloudinary.js";


export const Create = async (req, res) => {
    try {
        const { title, price, Discount, categoryName, isbn, description, publishingHouse, stock, status } = req.body;

        // Validate and parse inputs
        const parsedPrice = parseFloat(price);
        const parsedDiscount = parseFloat(Discount) || 0;

        if (isNaN(parsedPrice) || isNaN(parsedDiscount)) {
            return res.status(400).json({ message: "Invalid price or discount value" });
        }

        const checkCategory = await CategoryModel.findOne({ name: categoryName });
        if (!checkCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        const checkBook = await BookModel.findOne({ isbn });
        if (checkBook) {
            return res.status(409).json({ message: "Book already exists" });
        }

        const finalPrice = parsedPrice - (parsedPrice * parsedDiscount / 100);

        const mainImageUpload = await cloudinary.uploader.upload(req.files.mainImage[0].path, { folder: `${process.env.AppName}/books/${title}/Main` });
        const mainImage = {
            secure_url: mainImageUpload.secure_url,
            public_id: mainImageUpload.public_id
        };

        const subImages = [];
        for (const file of req.files.subImages) {
            const subImageUpload = await cloudinary.uploader.upload(file.path, { folder: `${process.env.AppName}/books/${title}/Sub` });
            const subImage = {
                secure_url: subImageUpload.secure_url,
                public_id: subImageUpload.public_id
            };
            subImages.push(subImage);
        }

        const book = await BookModel.create({
            title,
            subImages,
            mainImage,
            description,
            isbn,
            price: parsedPrice,
            finalPrice,
            Discount: parsedDiscount,
            publishingHouse,
            categoryId: checkCategory._id,
            stock,
            status
        });

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

export const getActive = async (req,res) =>{
    const books = await BookModel.find({status:'Active'});
    return res.status(200).json({message:'success', books});
}


export const Delete = async (req,res)=>{
    const {id} = req.params;
    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({message:"book not found"});
    }
    if(book.mainImage){
        await cloudinary.uploader.destroy(book.mainImage.public_id);
    }
    await BookModel.findByIdAndDelete(id);
    return res.status(200).json({message:'success'});
}


export const Update = async (req,res)=>{
    const book = await BookModel.findById(req.params.id);
    if(!book){
        return res.status(404).json({message:"Book not found"})
    }

    if(req.body.categoryId){
        const category = await CategoryModel.findById(req.body.categoryId);
        if(!category){
            return res.status(404).json({message:"category not found"});
        }
        book.categoryId = req.body.categoryId;
    }

    if(req.body.isbn) {
        const {isbn} = req.body
        const checkBook = await BookModel.findOne({isbn:isbn});
        if (checkBook) {
            return res.status(409).json({ message: "book already exists" });
        }
        book.isbn = req.body.isbn;
    }

    if(req.body.title){
        if(await BookModel.findOne({title:req.body.title})){
            return res.status(409).json({message:"book already exists"});
        }
        book.title = req.body.title
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
    if(req.body.status){
        book.status = req.body.status;
    }

    if(req.body.stock && req.body.stock>0){
        book.stock = req.body.stock;
    }
     if(req.body.Discount && req.body.Discount){
        book.Discount = req.body.Discount;
        book.finalPrice = book.price - ((book.price * (book.Discount || 0)) / 100);
     }
    
    if(req.file){
        cloudinary.uploader.destroy(book.mainImage.public_id);
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.AppName}/books`
        });
        book.mainImage = {secure_url,public_id};
    }

    
    await book.save();
    return res.status(200).json({message:'success',book});
}


// update sub image

export const addsubimage = async (req,res)=>{
    const { id } = req.params;
    const { subImages } = req.files;

    try {
        const book = await BookModel.findById(id); 
        const updatedSubImages = [];

        for (const file of subImages) {
            const subImageUpload = await cloudinary.uploader.upload(file.path, { folder: `${process.env.AppName}/books/${book.title}/Sub` });
            const subImage = { secure_url: subImageUpload.secure_url, public_id: subImageUpload.public_id };
            updatedSubImages.push(subImage);
        }

        book.subImages = [...book.subImages, ...updatedSubImages];

        // Save the updated book with new subimages
        await book.save();

        res.json({ message: 'success', updatedSubImages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update subimages' });
    }
}

export const deleteSubImage = async (req, res) => {
    const { id } = req.params;
    const { public_id } = req.query;
    try {
        const book = await BookModel.findById(id); 
        if(!book){
            return res.status(404).json({ message: 'Book not found' });
        }
        const subImageIndex = book.subImages.findIndex(image => image.public_id === public_id);

        if (subImageIndex === -1) {
            return res.status(404).json({ message: 'Subimage not found' });
        }

        // Delete the subimage from Cloudinary
        await cloudinary.uploader.destroy(public_id);

        // Remove the subimage from the book's subImages array
        book.subImages.splice(subImageIndex, 1);

        // Save the updated book without the deleted subimage
        await book.save();

        res.json({ message: 'success',book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete subimage' });
    }
}