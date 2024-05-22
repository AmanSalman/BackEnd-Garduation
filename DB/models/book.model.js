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
    finalPrice:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    publishingHouse:{
        type:String,
        required:true,
    },
    categoryId:{
        type:String,
        required:true,
        ref:'Category'
    },
    mainImage:{
        type:Object,
        required:true,
    },
    subImages:[{
        type:Object,
        required:false
    }],
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
    Discount:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        default:1
    },
    status:{
        type: String,
        default: 'Active',
        enum: ['Active', 'Disabled']
    }
    
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


export const BookModel = model('Book', BookSChema);
