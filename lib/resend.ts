import Register from "@/emails/register";
import ResetPassword from "@/emails/reset-password";
import { Resend } from "resend";
import { config } from "@/config";

export const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailConfig {
  to: string;
  subject: string;
  react: JSX.Element;
}

function getEmailAddresses(recipientEmail: string) {
  const isDevelopment = process.env.NODE_ENV === "development";
  return {
    to: isDevelopment ? process.env.DEV_EMAIL_TO : recipientEmail,
    from: isDevelopment ? process.env.DEV_EMAIL_FROM : config.email.from,
  };
}

async function sendEmail({ to, subject, react }: EmailConfig) {
  const { to: toEmail, from: fromEmail } = getEmailAddresses(to);

  if (!toEmail || !fromEmail) {
    throw new Error("Email address is missing");
  }

  await resend.emails.send({ from: fromEmail, to: [toEmail], subject, react });
}

export async function sendRegisterEmail(
  name: string,
  email: string,
  verificationToken: string
) {
  const verificationUrl = `${process.env.URL_FRONT}/verify-email?token=${verificationToken}`;
  const Template = require(config.email.templates.welcome.template).default;
  await sendEmail({
    to: email,
    subject: config.email.templates.welcome.subject,
    react: Template({ name, url: verificationUrl }),
  });
}

export async function sendResetPasswordEmail(
  name: string,
  email: string,
  resetToken: string
) {
  const resetUrl = `${process.env.URL_FRONT}/reset-password?token=${resetToken}`;
  const Template = require(config.email.templates.resetPassword
    .template).default;
  await sendEmail({
    to: email,
    subject: config.email.templates.resetPassword.subject,
    react: Template({ url: resetUrl, name }),
  });
}
