import jwt from 'jsonwebtoken';
import {UserModel} from './../../../DB/models/user.model.js';
import bcrypt, { compare } from 'bcrypt';
import {sendEmail} from '../../utls/sendEmail.js';
import {customAlphabet, nanoid} from 'nanoid';
import { AppError } from '../../utls/AppError.js';
import Joi from 'joi';
import { registerSchema } from './auth.validation.js';

export const login = async (req, res,next) => {
	const {email, password} = req.body;
	const user = await UserModel.findOne({email});
	if (! user) {
		return next(new AppError(`Invaild email`, 400))
	}

	// const token1 = jwt. sign({email}, process.env.SIGNConfirm)
	// await sendEmail({to:email,subject: 'welcome',userName:"aman", token:token1})
	// if(!user.confirmEmail){
	//     return res.status(400).json({ message: 'Please confirm your email' });
	// }

	const isMatch = await bcrypt.compare(password, user.password);
	if (! isMatch) {
		return next(new AppError(`Invaild password`, 400))
	}

	const token = jwt.sign({ 
		id: user._id,
		role: user.role,
		status: user.status
	}, process.env.JWT_SECRET);
	return res.status(200).json({message: 'success', token});
};

export const register = async (req, res,next) => {
	const {username, email, password, phone} = req.body;
	let role;
	if(req.body.role){
		 role = req.body.role
	}
	const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
	const newUser = await UserModel.create({username, email, password: hashedPassword, phone, role});
	if (! newUser) {
		return next(new AppError(`Error while creating user`, 500))
	}
	const token = jwt.sign({role,email }, process.env.JWT_SECRET)
	await sendEmail({to:email,subject: 'welcome',userName:username, token})
	//         await sendEmail({subject:'Kids Skills Store', html :`

	//         <div style="max-width: 600px; margin: 50px auto; background-color: #f9f9f9; padding: 30px; border-radius: 15px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">

	//     <h1 style="color: #0066cc; font-size: 32px; margin-bottom: 20px; font-weight: bold; text-transform: uppercase;">Welcome to Our Children's Book Store!</h1>

	//     <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px;">Dear ${username},</p>

	//     <p style="font-size: 20px; line-height: 1.6; margin-bottom: 30px;">Welcome to our Children's Book Store! We're thrilled to have you with us.</p>

	//     <p style="font-size: 20px; line-height: 1.6; margin-bottom: 30px;">Explore our diverse collection of children's books and unlock the world of imagination.</p>

	//     <p style="color: #0066cc; font-size: 22px; font-weight: bold; margin-top: 40px;">Best regards,<br>Kids Skills Team</p>

	// </div>


	//     </div>`})

	return res.status(201).json({message: 'success', newUser});

};


export const sendCode = async (req, res, next) => {
	const {email} = req.body
	const code = customAlphabet('1234567890abcdabcdef', 4)()
	const user = await UserModel.findOneAndUpdate({
		email: email
	}, {
		sendCode: code
	}, {new: true})
	if (! user) {
		return next(new AppError(`email not found`, 404))
	}
	await sendEmail({to: email, subject: 'Resest Your Password', html: `<h1>Code : ${code}</h1>`})
	return res.status(200).json({message: "success", user})
}

export const confirmEmail = async (req,res)=>{
	const token = req.params.token
	const decoded = jwt.verify(token, process.env.SIGNConfirm)
	await UserModel.findOneAndUpdate({email:decoded.email}, {confirmEmail:true})
	return res.status(200).json({message: "success"})
}

export const forgetPassword = async (req, res, next) => {
	const {email, password, code} = req.body
	const user = await UserModel.findOne({email: email})
	if (! user) {
		return next(new AppError(`email not found`, 404))
	}

	if (user.sendCode != code) {
		return next(new AppError(`invalid code`, 400))
	}

	user.password = await bcrypt.hash(password, parseInt(process.env.SALT))
	user.sendCode = null
	await user.save()
	return res.status(200).json({message: "success"})
}


export const UpdateProfile = async (req, res, next) => {
	const {username, email, phone} = req.body
	const check = await UserModel.findById(req.user._id);
	if (!check) {
		return next(new AppError(`User not found`, 404))
	}
	if(req.body.email){
		const checkemail = await UserModel.findOne({email: email})
        if(checkemail){
					return next(new AppError(`email already in use`, 409))
        }
		check.email = req.body.email
	} 
	
	if(req.body.username){
        check.username = req.body.username
	}
	if(req.body.phone){
		const checkphone = await UserModel.findOne({phone: phone})
		if(checkphone){
			return next(new AppError(`phone number already in use`, 404))
		}
        check.phone = req.body.phone
    }
	await check.save()

	return res.status(200).json({message: "success", user: check})
}


export const updatePassword = async(req, res, next)=>{

    const {oldPassword,newPassword} = req.body;

    const user = await UserModel.findById(req.user._id);
    const match = compare(oldPassword,user.password)
    if(!match){
			return next(new AppError(`invalid password`, 400))
    }
    const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT));
    await UserModel.findByIdAndUpdate(req.user._id,{password:hashPassword});
    return res.json({message:"success"})
} 
