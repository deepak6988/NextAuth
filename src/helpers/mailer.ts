import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';

type SendEmailParams = {
  email: string;
  type: string;
  userId: string;
};

export const sendEmail = async ({ email, type, userId }: SendEmailParams) => {
  try {
    const hashedToken = await bcrypt.hash(userId, 10);

    if (type === 'VERIFY') {
      await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
    }
    else if (type === 'RESET') {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
    }

    // implement mailer logic here
    var transport = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: process.env.MAILTRAP_TOKEN 
      }
    });


    const mailOptions = {
      from: "hello@demomailtrap.co", // sender address
      to: email, // list of recipients
      subject: type === 'VERIFY' ? "Verify your email" : "Reset your password",
      html: "<b>Hello world?</b>", // HTML body
    };
    const res = await transport.sendMail(mailOptions);
    return res;
  }
  catch (error: any) {
    throw new Error(error.message);
  }
};


