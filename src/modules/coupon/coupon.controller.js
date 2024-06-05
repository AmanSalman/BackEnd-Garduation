import { CouponModel } from "../../../DB/models/coupon.model.js"

export const create = async (req,res)=>{
  const {name,Amount,status} = req.body
  const check = await CouponModel.findOne({name})
  if(check){
    return res.status(409).json({message:"Coupon already exist"})
  }
  const coupon = await CouponModel.create({name,Amount,status})
  return res.json({message:"success",coupon})
}

export const getCoupon = async (req,res) => {
  const {id} = req.params;
  const coupon = await CouponModel.findById(id);
  if(!coupon){
    return res.status(404).json({message:"Coupon not found"});
  }
  return res.status(200).json({message:"success",coupon});
}

export const getAll = async (req,res) =>{
  const coupon = await CouponModel.find();
  return res.status(200).json({message:"success",coupon}); 
}

export const deleteCoupon = async (req,res) => {
  const {id} = req.params;
  const coupon = await CouponModel.findById(id);
  if(!coupon){
    return res.status(404).json({message:"Coupon not found"});
  }
  await CouponModel.findByIdAndDelete(id);
  return res.status(200).json({message:"success"}); 
}


export const updateCoupon = async (req,res) => {
  const {id} = req.params
  const coupon = await CouponModel.findById(id)
  if(!coupon){
    return res.status(404).json({message:"Coupon not found"});
  }

  if(req.body.name){
    const check = await CouponModel.findOne({name:req.body.name})
    if(check){
      return res.status(409).json({message:"Coupon already exist"})
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