import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    // from: "info@jamiamosque.co.ke",
    from: "no-reply@athcongroup.tech",
    to: email,
    subject: "Reset Your Password",
    html: `<p> CLick <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    // from: "info@jamiamosque.co.ke",
    from: "no-reply@athcongroup.tech",
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
      from: "no-reply@athcongroup.tech",
      to: "khalfanathman12@gmail.com",
      subject: "User Profile Information",
      html: `<p>Please find attached the profile information of user ID ${email}.</p>`,
    });
  } catch (error) {
    console.error("Error sending profile email:", error);
    throw new Error("Failed to send profile email.");
  }
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    return await resend.emails.send({
      from: "no-reply@athcongroup.tech",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
