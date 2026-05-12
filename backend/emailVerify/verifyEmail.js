import { sendMail } from "../utils/mailer.js";

export const verifyEmail = async (token, email) => {
    const baseUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : "http://localhost:5173";
    const verificationUrl = `${baseUrl}/verify-email/${token}`;

    await sendMail({
        email,
        subject: "Verify Your Email - Ekart",
        text: `Please verify your email by clicking the following link: ${verificationUrl}\n\nThis link expires in 10 minutes.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Verify Your Email Address</h2>
                <p>Thank you for registering with Ekart! Please click the button below to verify your email address.</p>
                <a href="${verificationUrl}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
                    Verify Email
                </a>
                <p style="color: #666; font-size: 14px;">This link expires in <strong>10 minutes</strong>.</p>
                <p style="color: #666; font-size: 14px;">If you did not create an account, you can safely ignore this email.</p>
            </div>
        `,
    });
};
