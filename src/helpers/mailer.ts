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
    const transport = nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.MAILTRAP_TOKEN ,
      })
    );

    const sender = {
      address: "hello@demomailtrap.co",
      name: "Mailtrap Test",
    };


    const mailOptions = {
      from: sender, // sender address
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

function MailtrapTransport(arg0: { token: any; }): import("nodemailer/lib/smtp-pool") | import("nodemailer/lib/smtp-pool").Options {
  throw new Error("Function not implemented.");
}
