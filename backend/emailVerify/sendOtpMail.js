import nodemailer from "nodemailer";
import "dotenv/config";

export const sendOTPEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // ❗ false
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const mailConfig = {
            from: `"Ekart" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "OTP Verification - Ekart",
            text: `Your OTP for password reset is: ${otp}`,
        };

        await transporter.sendMail(mailConfig); // 🔥 IMPORTANT
        console.log("✅ OTP sent to:", email);
    } catch (error) {
        console.error("❌ OTP email error:", error.message);
    }
};
