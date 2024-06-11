import { wishListModel } from "../../../DB/models/wishlist.model.js";
import { AppError } from "../../utls/AppError.js";
export const Create = async (req, res,next) => {
    const {bookId} = req.body;
    const getlist = await wishListModel.findOne({userId:req.user._id})
    if(!getlist){
        const wishList = await wishListModel.create({
            userId:req.user._id,
            books:{bookId}
        })
        return res.json({message:"success", wishList})
    }

    for(let i=0; i<getlist.books.length; i++){
        if(getlist.books[i].bookId == bookId){
            return next(new AppError(`book already in wishList`, 400))
        }
    }

    getlist.books.push({bookId})
    await getlist.save()
    return res.json({message:"success", getlist})
}  

export const Remove = async (req, res) => {
    const {bookId} = req.params;
    const wishList = await wishListModel.findOneAndUpdate({userId:req.user._id},
        {
            $pull:{
                books:{bookId}
            }
        }, {new:true}
    )

    return res.json({message:"success", wishList})
}


export const Clear = async (req,res) =>{ 
    const wishlist = await wishListModel.findOneAndUpdate({
        userId:req.user._id
    }, {
        books:[]
    }, {
        new:true
    })
    return res.json({message:"success"})
}

export const Get = async (req,res) =>{
    const wishList = await wishListModel.findOne({userId:req.user._id})
    return res.json({message:"success", wishList})
}

 