import cartModel from "../../../DB/models/cart.model.js"
import { CouponModel } from "../../../DB/models/coupon.model.js"
import { orderModel } from "../../../DB/models/order.model.js";
import { UserModel } from "../../../DB/models/user.model.js";
import { BookModel } from './../../../DB/models/book.model.js';

export const create = async (req,res)=>{
  const cart = await cartModel.findOne({userId:req.user._id})
  if(!cart){
    return res.status(400).json({message:"cart is empty"})
  }

  req.body.books = cart.books

  let coupon
  if(req.body.couponName){
    coupon = await CouponModel.findOne({name:req.body.couponName})
    if(!coupon){
      return res.status(404).json({message:"coupon not found"})
    }
    if(coupon.status == 'inactive'){
      return res.status(400).json({message:"coupon is inactive"})
    }

    if(coupon.usedBy.some(user => user._id.toString() === req.user._id.toString())){
      return res.status(400).json({message:"coupon already used"})
    }
    req.body.coupon = coupon
  }

  let finalBooksList = []
  let subTotal = 0 
  for(let book of req.body.books){
    const checkBook = await BookModel.findById({
      _id:book.bookId,
      stock:{$gte:book.quantity}
    })
    if(!checkBook){
      return res.status(404).json({message:"book quantity not available"})
    }

    book = book.toObject()
    book.title = checkBook.title
    book.unitPrice = checkBook.price
    book.Discount = checkBook.Discount
    book.finalPrice = book.quantity * checkBook.finalPrice
    subTotal+=book.finalPrice
    finalBooksList.push(book)
  }
  const user = await UserModel.findById(req.user._id)
  if(!req.body.phone){
    req.body.phone = user.phone
  }

  const order = await orderModel.create({
    userId:req.user._id,
    books:finalBooksList,
    finalPrice:subTotal - (subTotal * ((req.body.coupon?.Amount || 0 )/100)),
    Address:req.body.Address,
    phone:req.body.phone,
    coupon:req.body.coupon,
    status:'pending',
  })

  
  if(order){
    for(const book of req.body.books){
      const updateBook = await BookModel.findOneAndUpdate(
        { _id: book.bookId },
        { $inc: { stock: -book.quantity } }
      )
    }

    if (req.body.coupon) {
      await CouponModel.findByIdAndUpdate({_id:req.body.coupon._id}, {
        $addToSet:{
          usedBy:req.user._id
        }
      })
    }

    await cartModel.findOneAndUpdate({userId:req.user._id}, {
        books:[]
    })
 
  
  }

  return res.json({message:'success', order})
} 

export const orders = async (req, res) => {
  const orders = await orderModel.find()
  return res.json({message:'success', orders})
}

export const getOrdersCounts = async (req,res)=>{
  const orders = await orderModel.find()
  const acceptedOrders = orders.filter(order =>
    order.status === 'accepted'
  ).length
  const rejectedOrders = orders.filter(order =>
    order.status ==='rejected'
  ).length
  const ordersCount = orders.length
  return res.status(200).json({message:'success', acceptedOrders, rejectedOrders, ordersCount});
}

export const getPending = async(req, res)=>{
  const pending = await orderModel.find({status:'pending'})
  return res.json({message:'success', pending}) 
} 

export const onWay = async(req, res)=>{
  const {id} = req.params
  const order =  await orderModel.findById(id)
  if(!order){
    return res.status(404).json({message:"order not found"})
  }
  if(order.status === 'onway'){
    return res.status(400).json({message:"order already onway"})
  }
  const onway = await orderModel.findOneAndUpdate({_id:id}, {
    status:'onway'
  },{
    new:true
  })

  return res.json({message:'success', onway})
}

export const accept = async(req,res)=>{
  const {id} = req.params
  const order =  await orderModel.findById(id)
  if(!order){
    return res.status(404).json({message:"order not found"})
  }
  if(order.status === 'accepted'){
    return res.status(400).json({message:"order already accepted"})
  }
  const accepted = await orderModel.findOneAndUpdate({_id:id}, {
    status:'accepted'
  },{
    new:true
  })
  return res.json({message:'success', accepted})
}

export const acceptedOrders = async (req,res)=>{
  const accepted = await orderModel.find({status:'accepted'})
  return res.json({message:'success', accepted})
}

export const orderdetails = async (req,res)=>{
  const {id} = req.params
  const order =  await orderModel.findById(id)
  if(!order){
    return res.status(404).json({message:"order not found"})
  }
  return res.json({message:'success', order})
}