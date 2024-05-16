import cartModel from "../../../DB/models/cart.model.js"

export const Create = async (req, res) => {
    const {bookId} = req.body;
    const cart = await cartModel.findOne({userId:req.user._id})
    if(!cart){
        const newCart = await cartModel.create({
            userId:req.user._id,
            books:{bookId}
        })
        return res.json({message:"success", cart:newCart})
    }

    for(let i=0; i<cart.books.length; i++){
        if(cart.books[i].bookId == bookId){
            return res.status(400).json({message:"book already in cart"})
        }
    }

    cart.books.push({bookId})
    await cart.save()
    return res.json({message:"success", cart:cart})
}  

export const Remove = async (req, res) => {
    const {bookId} = req.params;
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id},
        {
            $pull:{
                books:{bookId}
            }
        }, {new:true}
    )

    return res.json({message:"success", cart:cart})
}


export const Clear = async (req,res) =>{ 
    const cart = await cartModel.findOneAndUpdate({
        userId:req.user._id
    }, {
        books:[]
    }, {
        new:true
    })
    return res.json({message:"success"})
}

export const Get = async (req,res) =>{
    const cart = await cartModel.findOne({userId:req.user._id})
    return res.json({message:"success", cart:cart})
}

export const increaseQty = async (req, res) => {
    const {quantity} = req.body
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id, 
        "books.bookId":req.params.bookId,
        }, {
            $inc:{
                "books.$.quantity":quantity
            }
        }, {new:true})
        return res.json({message:"success", cart:cart})
}

export const decreaseQty = async (req, res) => {
    const {quantity} = req.body
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id, 
        "books.bookId":req.params.bookId,
        }, {
            $inc:{
                "books.$.quantity":-quantity
            }
        }, {new:true})
        return res.json({message:"success", cart:cart})
}


 