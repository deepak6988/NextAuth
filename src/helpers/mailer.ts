import nodemailer from "nodemailer";

type SendEmailParams = {
  email: string;
  type: string;
  userId: string;
};

export const sendEmail = async ({ email, type, userId }: SendEmailParams) => {
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
    from: '"Example Team" <team@example.com>', // sender address
    to: "alice@example.com, bob@example.com", // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // HTML body
  };
  const res = await transporter.sendMail(mailOptions);
  return res;
}; 