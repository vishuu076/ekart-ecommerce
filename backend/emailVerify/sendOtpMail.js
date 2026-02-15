import nodemailer from 'nodemailer';
import "dotenv/config";
import { text } from 'express';

export const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailConfig = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'OTP Verification - Ekart',
        text: `Your OTP for password reset is: ${otp}
        Thanks`,
    };

    transporter.sendMail(mailConfig, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('OTP sent successfully:', info.response);
        }
    });
}

