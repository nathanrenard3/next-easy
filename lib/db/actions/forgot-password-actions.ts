"use server";

import prisma from "@/lib/db/prisma";
import { sendResetPasswordEmail } from "@/lib/resend";
import crypto from "crypto";

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email") as string;

  if (!email) {
    throw new Error("L'adresse email est requise");
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    // We don't want to reveal if the email exists or not for security reasons
    return { success: true };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpires: resetTokenExpires,
    },
  });

  try {
    await sendResetPasswordEmail(user.firstName, user.email, resetToken);
    return { success: true };
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Impossible d'envoyer l'e-mail de réinitialisation");
  }
};
