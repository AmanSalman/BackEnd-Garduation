import mongoose, { Schema, Types, model } from "mongoose";

const couponSchema =new Schema({
  name:{
    type:String,
    required:true,
    unique:true 
  },
  usedBy:[
    {
      type:Types.ObjectId,
      ref:'User',
  }],
  Amount:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    default:'active',
    enum:['active','inactive']
  }
},{
  timestamps: true,
})


export const CouponModel = model('Coupon', couponSchema);