import mongoose, { Schema, Types, model } from "mongoose";


const BookSChema = new Schema({
    isbn:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    publishingHouse:{
        type:String,
        required:false,
    },
    categoryName:{
        type:String,
        required:true,
        ref:'Category'
    },
    image:{
        type:Object,
        required:true,
    },
    createdBY:{ 
        type:Types.ObjectId,
        ref:'User',
        // required:true
    },
    updatedBY:{
        type:Types.ObjectId,
        ref:'User',
        // required:true
    },
    slug:{
        type:String,
        required:true
    },
    
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


export const BookModel = model('Book', BookSChema);
