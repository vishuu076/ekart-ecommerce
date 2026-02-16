import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyEmail = async (token, email) => {
  await resend.emails.send({
    from: "Ekart <onboarding@resend.dev>",
    to: email,
    subject: "Verify your email - Ekart",
    html: `
      <h2>Verify your email</h2>
      <p>Click the button below to verify your email:</p>
      <a href="${process.env.BACKEND_URL}/verify-email/${token}">
        Verify Email
      </a>
    `,
  });
};
