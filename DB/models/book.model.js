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
        minlength: 3,
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
        required:false,
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
    },
    categoryName:{
        type:String,
        required:true,
        ref:'Category'
    },
    deleted: {
        type: Boolean,
        default: false
      }
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


BookSChema.virtual ('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'bookId',
})

export const BookModel = model('Book', BookSChema);
