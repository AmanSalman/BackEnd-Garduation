import mongoose, { Schema, Types, model } from "mongoose";
//ctrl + H

const ReviewSchema = new Schema ({
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    bookId:{
      type:Types.ObjectId,
      ref:'Book',
      required:true
    }
},{
  timestamps: true,
})




export const ReviewModel = model('Review', ReviewSchema);