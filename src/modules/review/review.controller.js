import { orderModel } from "../../../DB/models/order.model.js"
import { ReviewModel } from "../../../DB/models/review.model.js"
import { AppError } from "../../utls/AppError.js"


export const create = async (req,res,next) =>{
  const {bookId} = req.params
  const {comment , rating} = req.body

  const order = await orderModel.findOne({
    userId:req.user._id,
    status:'delivered',
    "books.bookId":bookId
  })

  if(!order){
    return next(new AppError(`can't review this book`, 404))
  }

  const checkReview =  await ReviewModel.findOne({
    userId:req.user._id,
    bookId:bookId
  })
  if(checkReview){
    return next(new AppError(`you have already reviewed this book`, 400))
  }
  const newReview = await ReviewModel.create({
    userId:req.user._id,
    bookId:bookId,
    comment:comment,
    rating:rating 
  })

  return res.status(201).json({message:'success', newReview})
}


export const remove = async (req,res,next) =>{
  const {id} = req.params
  const review = await ReviewModel.findById(id)
  if(!review){
    return next(new AppError(`review not found`, 404))
  }
   await ReviewModel.findByIdAndDelete(id)

  return res.status(200).json({message:'success'})
}


export const get = async (req,res,next) =>{
  const {id} = req.params
  const review = await ReviewModel.findById(id)
  if(!review){
    return next(new AppError(`review not found`, 404))
  }
  return res.status(200).json({message:'success', review})
}

