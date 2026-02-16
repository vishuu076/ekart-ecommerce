import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = async (token, email) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error("MAIL_USER or MAIL_PASS environment variables are not set.");
  }

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io", // Mailtrap ka host
    port: 2525,                     // Mailtrap ka port
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const encodedToken = encodeURIComponent(token);
  const verifyLink = `${process.env.FRONTEND_URL}/verify-email/${encodedToken}`;

  const mailConfig = {
    from: `"Ekart" <no-reply@ekart.com>`, // Mailtrap mein 'from' kuch bhi rakh sakte ho
    to: email,
    subject: "Email Verification - Ekart",
    html: `
      <h2>Welcome to Ekart 👋</h2>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${verifyLink}" 
         style="display:inline-block;padding:12px 20px;background:#ec4899;color:white;text-decoration:none;border-radius:6px;">
         Verify Email
      </a>
      <p>If the button doesn't work, copy & paste this link:</p>
      <p>${verifyLink}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailConfig);
    console.log("✅ Verification email sent to Mailtrap:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }  
};