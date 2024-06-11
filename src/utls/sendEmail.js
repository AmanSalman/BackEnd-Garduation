import nodemailer from 'nodemailer'
import { emailTemplate } from './EmailTemplate.js';

export const sendEmail = async ({to,subject,userName='',token})=>{
    const transporter = nodemailer.createTransport({
      service:'gmail',
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });


      const info = await transporter.sendMail({
        from: process.env.email, 
        to,
        subject,
        html:emailTemplate(userName, token), 
      });

      return info

}