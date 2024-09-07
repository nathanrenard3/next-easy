"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/db/authOptions";

export const updateUserAction = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You must be logged in to update your profile");
  }

  const userId = formData.get("userId") as string;
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (currentPassword && newPassword) {
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Le mot de passe actuel est incorrect");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    revalidatePath("/settings");
  }
};
