import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendMail = async (options) => {
    try {
        const mailOptions = {
            from: `"Ekart" <${process.env.MAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${options.subject} to ${options.email}`);
        return info;
    } catch (error) {
        console.error(`❌ Email error (${options.subject}):`, error.message);
        throw error;
    }
};
