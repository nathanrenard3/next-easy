import Register from "@/emails/register";
import ResetPassword from "@/emails/reset-password";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailConfig {
  to: string;
  subject: string;
  react: JSX.Element;
}

function getEmailAddresses(recipientEmail: string) {
  const isDevelopment = process.env.NODE_ENV === "development";
  return {
    to: isDevelopment ? process.env.DEV_EMAIL_TO || "" : recipientEmail,
    from: isDevelopment
      ? process.env.DEV_EMAIL_FROM || ""
      : "noreply@iconik-hub.fr",
  };
}

async function sendEmail({ to, subject, react }: EmailConfig) {
  const { to: toEmail, from: fromEmail } = getEmailAddresses(to);

  if (!toEmail) {
    throw new Error("L'adresse email du destinataire est manquante");
  }

  await resend.emails.send({ from: fromEmail, to: [toEmail], subject, react });
}

export async function sendRegisterEmail(
  name: string,
  email: string,
  verificationToken: string
) {
  const verificationUrl = `${process.env.URL_FRONT}/verify-email?token=${verificationToken}`;
  await sendEmail({
    to: email,
    subject: "Bienvenue chez Iconik - Votre accès personnel est prêt !",
    react: Register({ name, url: verificationUrl }),
  });
}

export async function sendResetPasswordEmail(
  name: string,
  email: string,
  resetToken: string
) {
  const resetUrl = `${process.env.URL_FRONT}/reset-password?token=${resetToken}`;
  await sendEmail({
    to: email,
    subject: "Réinitialisation de votre mot de passe Iconik",
    react: ResetPassword({ url: resetUrl, name }),
  });
}
