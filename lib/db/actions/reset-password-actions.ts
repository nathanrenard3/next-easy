"use server";

import prisma from "@/lib/db/prisma";
import bcrypt from "bcrypt";

export const resetPasswordAction = async (formData: FormData) => {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;

  if (!token || !password) {
    throw new Error("Token et mot de passe requis");
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpires: { gt: new Date() },
    },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  return { success: true };
};
