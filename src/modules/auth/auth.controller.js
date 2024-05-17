import jwt from 'jsonwebtoken';
import { UserModel } from './../../../DB/models/user.model.js';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../utls/sendEmail.js';
import { customAlphabet, nanoid } from 'nanoid';

export const login = async (req, res) => {
    const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invaild email' });
        }

        // if(!user.confirmEmail){
        //     return res.status(400).json({ message: 'Please confirm your email' });
        // }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invaild password' });
        }

        const token = jwt.sign({ id: user._id, role:user.role,status:user.status }, process.env.JWT_SECRET); 
        return res.status(200).json({ message: 'success', token });
};

export const register = async (req, res) => {
    const { username, email, password,phone } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        const newUser = await UserModel.create({ username, email, password: hashedPassword,phone });
        if (!newUser) {
            return res.status(500).json({ message: 'Error while creating user' });
        }
        
//         await sendEmail({subject:'Kids Skills Store', html :`

//         <div style="max-width: 600px; margin: 50px auto; background-color: #f9f9f9; padding: 30px; border-radius: 15px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">

//     <h1 style="color: #0066cc; font-size: 32px; margin-bottom: 20px; font-weight: bold; text-transform: uppercase;">Welcome to Our Children's Book Store!</h1>

//     <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px;">Dear ${username},</p>

//     <p style="font-size: 20px; line-height: 1.6; margin-bottom: 30px;">Welcome to our Children's Book Store! We're thrilled to have you with us.</p>

//     <p style="font-size: 20px; line-height: 1.6; margin-bottom: 30px;">Explore our diverse collection of children's books and unlock the world of imagination.</p>

//     <p style="color: #0066cc; font-size: 22px; font-weight: bold; margin-top: 40px;">Best regards,<br>Kids Skills Team</p>

// </div>

    
//     </div>`})
            return res.status(201).json( { message: 'success', newUser });

};


export const sendCode = async (req,res)=>{
    const {email } = req.body
    const code = customAlphabet('1234567890abcdabcdef',4)()
    const user = await UserModel.findOneAndUpdate({email: email}, {sendCode: code} ,{ new: true })
    if(!user){
        return res.status(404).json({message:"email not found"})
    }
    await sendEmail({to:email, subject: 'Resest Your Password', html:`<h1>Code : ${code}</h1>`})
    return res.status(200).json({message:"success",user})
}


export const forgetPassword = async (req,res) =>{
    const {email,password,code} = req.body
    const user = await UserModel.findOne({email:email})
    if(!user){
        return res.status(404).json({message:"email not found"})
    }

    if(user.sendCode != code ){
        return res.status(400).json({message:"invalid code"}) 
    } 

    user.password = await bcrypt.hash(password, parseInt(process.env.SALT))
    user.sendCode = null
    await user.save()
    return res.status(200).json({message:"success"})
}