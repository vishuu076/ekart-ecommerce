import { sendMail } from "../utils/mailer.js";

export const sendOTPEmail = async (email, otp) => {
    await sendMail({
        email,
        subject: "Your OTP - Ekart",
        text: `Your OTP for password reset is: ${otp}\n\nThis OTP is valid for 10 minutes. Do not share it with anyone.`,
        html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p><p>This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>`,
    });
};
