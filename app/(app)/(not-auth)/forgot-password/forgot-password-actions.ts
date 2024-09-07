"use server";

import prisma from "@/lib/db/prisma";
import { sendResetPasswordEmail } from "@/lib/resend";

interface ForgotPasswordProps {
  email: string;
}

export const forgotPasswordAction = async (props: ForgotPasswordProps) => {
  const { email } = props;

  if (!email) {
    throw new Error("Email is required");
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    // We don't want to reveal if the email exists or not for security reasons
    return { success: true };
  }

  const resetToken = crypto.randomUUID();
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
    throw new Error("Unable to send the reset password email.");
  }
};
