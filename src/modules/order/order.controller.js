import cartModel from "../../../DB/models/cart.model.js"
import { CouponModel } from "../../../DB/models/coupon.model.js"

export const create = async (req,res)=>{
  const cart = await cartModel.findOne({userId:req.user._id})
  if(!cart){
    return res.status(400).json({message:"cart is empty"})
  }

  if(req.body.couponId){
    const coupon = await CouponModel.findById(req.body.couponId)
    if(!coupon){
      return res.status(404).json({message:"coupon not found"})
    }
    if(coupon.status == 'inactive'){
      return res.status(400).json({message:"coupon is inactive"})
    }

    if(coupon.usedBy.includes(req.user._id)){
      return res.status(400).json({message:"coupon already used"})
    }

    req.body.coupon = coupon
  }

} 