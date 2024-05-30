import { orderModel } from "../../../DB/models/order.model.js"
import { ReviewModel } from "../../../DB/models/review.model.js"


export const create = async (req,res) =>{
  const {bookId} = req.params
  const {comment , rating} = req.body

  const order = await orderModel.findOne({
    userId:req.user._id,
    status:'delivered',
    "books.bookId":bookId
  })

  if(!order){
    return res.status(404).json({message:'can review this book'})
  }

  const checkReview =  await ReviewModel.findOne({
    userId:req.user._id,
    bookId:bookId
  })
  if(checkReview){
    return res.status(400).json({message:'you have already reviewed this book'})
  }
  const newReview = await ReviewModel.create({
    userId:req.user._id,
    bookId:bookId,
    comment:comment,
    rating:rating 
  })

  return res.status(201).json({message:'success', newReview})
}