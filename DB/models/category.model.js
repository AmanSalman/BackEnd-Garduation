import mongoose, { Schema, Types, model } from "mongoose";
//ctrl + H

const CategorySchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:Object
    },
    slug:{
        type:String,
        required:true
    },
    status: {
		type: String,
		default: 'active',
		enum: ['active', 'inactive']
	},
})


export const CategoryModel = model('Category', CategorySchema);