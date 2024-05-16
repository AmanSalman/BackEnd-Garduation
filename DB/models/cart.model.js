import mongoose, { Schema, Types, model } from "mongoose";

const cartSchema = new Schema({
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
        },
        quantity:{
            type:Number,
            default:1
        }
    }]
},{
    timestamps: true,
})

const cartModel = model('cart', cartSchema)

export default cartModel;