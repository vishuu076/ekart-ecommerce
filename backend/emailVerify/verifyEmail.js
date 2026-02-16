import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyEmail = async (token, email) => {
  try {
    console.log("VERIFY EMAIL FUNCTION CALLED");

    const response = await resend.emails.send({
      from: "Ekart <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email - Ekart",
      html: `
        <h2>Verify your email</h2>
        <p>Click below to verify:</p>
        <a href="${process.env.BACKEND_URL}/verify-email/${token}">
          Verify Email
        </a>
      `,
    });

    console.log("RESEND RESPONSE 👉", response);
    console.log("EMAIL SEND ATTEMPTED TO:", email);

  } catch (error) {
    console.error("RESEND ERROR ❌", error);
  }
};
