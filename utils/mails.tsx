import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    // from: "info@jamiamosque.co.ke",
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password",
    html: `<p> CLick <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    // from: "info@jamiamosque.co.ke",
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your Email",
    html: `<p> CLick <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendProfileEmail = async (email: string) => {
  // const emailData = {
  //   from: "onboarding@resend.dev",
  //   to: "khalfanathman12@gmail.com",
  //   subject: "User Profile Information",
  //   html: `<p>Please find attached the profile information of user ID ${userId}.</p>`,
  // };

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "khalfanathman12@gmail.com",
      subject: "User Profile Information",
      html: `<p>Please find attached the profile information of user ID ${email}.</p>`,
    });
  } catch (error) {
    console.error("Error sending profile email:", error);
    throw new Error("Failed to send profile email.");
  }
};
