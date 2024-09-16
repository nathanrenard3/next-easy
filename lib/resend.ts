import { Resend } from "resend";
import { config } from "@/config";
import ResetPassword from "@/emails/reset-password";
import Register from "@/emails/register";

export const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailConfig {
  to: string;
  subject: string;
  react: JSX.Element;
}

/**
 * Determines the appropriate email addresses based on the environment.
 *
 * @param {string} recipientEmail - The intended recipient's email address.
 * @returns {Object} An object containing 'to' and 'from' email addresses.
 */
function getEmailAddresses(recipientEmail: string) {
  const isDevelopment = process.env.NODE_ENV === "development";
  return {
    to: isDevelopment ? process.env.DEV_EMAIL_TO : recipientEmail,
    from: isDevelopment ? process.env.DEV_EMAIL_FROM : config.email.from,
  };
}

/**
 * Sends an email using the Resend service.
 *
 * @param {EmailConfig} config - The email configuration object.
 * @throws {Error} If email addresses are missing.
 */
async function sendEmail({ to, subject, react }: EmailConfig) {
  const { to: toEmail, from: fromEmail } = getEmailAddresses(to);

  if (!toEmail || !fromEmail) {
    throw new Error("Email address is missing");
  }

  await resend.emails.send({ from: fromEmail, to: [toEmail], subject, react });
}

/**
 * Sends a registration email with a verification link.
 *
 * @param {string} name - The recipient's name.
 * @param {string} email - The recipient's email address.
 * @param {string} verificationToken - The token for email verification.
 */
export async function sendRegisterEmail(
  name: string,
  email: string,
  verificationToken: string
) {
  const verificationUrl = `${process.env.URL_FRONT}/verify-email?token=${verificationToken}`;
  await sendEmail({
    to: email,
    subject: "Welcome to NextEasy platform",
    react: Register({ name, url: verificationUrl }),
  });
}

/**
 * Sends a password reset email with a reset link.
 *
 * @param {string} name - The recipient's name.
 * @param {string} email - The recipient's email address.
 * @param {string} resetToken - The token for password reset.
 */
export async function sendResetPasswordEmail(
  name: string,
  email: string,
  resetToken: string
) {
  const resetUrl = `${process.env.URL_FRONT}/reset-password?token=${resetToken}`;
  await sendEmail({
    to: email,
    subject: "Reset your password",
    react: ResetPassword({ url: resetUrl, name }),
  });
}
