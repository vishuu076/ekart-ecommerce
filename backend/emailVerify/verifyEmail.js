import nodemailer from "nodemailer";

export const verifyEmail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,          // 👈 IMPORTANT
    secure: false,      // 👈 IMPORTANT (TLS)
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    family: 4,          // 👈 FORCE IPv4 (THIS FIXES ENETUNREACH)
  });

  const mailConfig = {
    from: `"Ekart" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Email Verification - Ekart",
    html: `
      <h2>Verify your email</h2>
      <p>Click the button below to verify your email:</p>
      <a href="${process.env.BACKEND_URL}/verify-email/${token}"
         style="padding:10px 15px;background:black;color:white;text-decoration:none;">
         Verify Email
      </a>
    `,
  };

  await transporter.sendMail(mailConfig);
};
