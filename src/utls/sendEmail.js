import nodemailer from 'nodemailer'

export const sendEmail = async ({to,subject,html})=>{
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
        html, 
      });

      return info

}