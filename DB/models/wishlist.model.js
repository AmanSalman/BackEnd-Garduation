import mongoose, { Schema, Types, model } from "mongoose";

const wishListSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    books:[{
        bookId:{
            type:Types.ObjectId,
            ref:'Book',
            required:true
        }
    }]
},{
    timestamps: true,
})

export const wishListModel = model('wishlist', wishListSchema)

