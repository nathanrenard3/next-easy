"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

interface UpdateUserActionProps {
  userId: string;
  currentPassword?: string;
  newPassword?: string;
}

export const updateUserAction = async ({
  userId,
  currentPassword,
  newPassword,
}: UpdateUserActionProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You must be logged in to update your profile");
  }

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
