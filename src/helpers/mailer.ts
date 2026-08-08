import nodemailer from "nodemailer";

type SendEmailParams = {
  email: string;
  type: string;
  userId: string;
};

export const sendEmail = async ({ email, type, userId }: SendEmailParams) => {
  try {
    // implement mailer logic here
  const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
  });
  const mailOptions = {
    from: "deepakumar6988@gmail.com", // sender address
    to: email, // list of recipients
    subject: type === 'VERIFY' ? "Verify your email" : "Reset your password", 
    html: "<b>Hello world?</b>", // HTML body
  };
  const res = await transporter.sendMail(mailOptions);
  return res;
  }
  catch(error:any){
    throw new Error(error.message);
  }
}; 