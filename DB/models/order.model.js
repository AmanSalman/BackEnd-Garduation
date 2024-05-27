

import mongoose, { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  books:[{
    title:{
      type:String,
      required:true
    },
    bookId:{
      type:Schema.Types.ObjectId,
      ref:'Book',
      required:true
    },
    quantity:{
      type:Number,
      default:1,
      required:true
    },
    unitPrice:{
      type:Number,
      required:true
    },
    finalPrice:{
      type:Number,
      required:true
    },
    mainImage:{
      type:Object,
      // required:true,
  },
  }],
  finalPrice:{
    type:Number,
    required:true
  },
  Address:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:'pending',
    enum:['pending','accepted', 'rejected', 'delivered', 'onway']
  },
  rejectedReason:{
    type:String,
    required:false
  },
  couponName:{
    type:Schema.Types.ObjectId,
    ref:'Coupon',
    required:false
  }
},{
  timestamps: true,
})

export const orderModel = model('Order',OrderSchema)
