import mongoose, {Schema, model} from "mongoose";


const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 3,
		max: 20
	},
	email: {
		type: String,
		required: true,
		unique: true,
		// default:null --> we can't have more than one row to have a null value
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required:true,
		unique: true,
	},
	confirmEmail: {
		type: Boolean,
		default: false
	},
	status: {
		type: String,
		default: 'Activated',
		enum: ['Activated', 'Disabled']
	},
	role: {
		type: String,
		default: 'User',
		enum: ['User', 'Admin']
	},
	sendCode:{
		type:String,
		default:null
	}
}, 

{timestamps: true});


export const UserModel = model('User',UserSchema);
