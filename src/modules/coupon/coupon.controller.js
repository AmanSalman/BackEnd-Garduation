import { CouponModel } from "../../../DB/models/coupon.model.js"
import { AppError } from "../../utls/AppError.js"

export const create = async (req,res,next)=>{
  const {name,Amount,status} = req.body
  const check = await CouponModel.findOne({name})
  if(check){
    return next(new AppError(`Coupon already exist`, 409))
  }
  const coupon = await CouponModel.create({name,Amount,status})
  return res.json({message:"success",coupon})
}

export const getCoupon = async (req,res,next) => {
  const {id} = req.params;
  const coupon = await CouponModel.findById(id);
  if(!coupon){
    return next(new AppError(`Coupon not found`, 404))
  }
  return res.status(200).json({message:"success",coupon});
}

export const getAll = async (req,res,next) =>{
  const coupon = await CouponModel.find();
  return res.status(200).json({message:"success",coupon}); 
}

export const deleteCoupon = async (req,res,next) => {
  const {id} = req.params;
  const coupon = await CouponModel.findById(id);
  if(!coupon){
    return next(new AppError(`Coupon not found`, 404))
  }
  await CouponModel.findByIdAndDelete(id);
  return res.status(200).json({message:"success"}); 
}


export const updateCoupon = async (req,res,next) => {
  const {id} = req.params
  const coupon = await CouponModel.findById(id)
  if(!coupon){
    return next(new AppError(`Coupon not found`, 409))
  }

  if(req.body.name){
    const check = await CouponModel.findOne({name:req.body.name})
    if(check){
      return next(new AppError(`Coupon already exist`, 409))
    }
    coupon.name = req.body.name;
  }
  if(req.body.Amount){
    coupon.Amount = req.body.Amount;
  }

  if(req.body.status){
    coupon.status = req.body.status;
  }

  await coupon.save();
  return res.status(200).json({message:"success",coupon})
}