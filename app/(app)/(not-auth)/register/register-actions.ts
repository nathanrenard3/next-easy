"use server";

import { stripe } from "@/lib/stripe";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import { sendRegisterEmail } from "@/lib/resend";

export const generateAndSendVerificationToken = async (email: string) => {
  const verificationToken = crypto.randomUUID();
  const user = await prisma.user.update({
    where: {
      email: email.toLowerCase(),
    },
    data: {
      verificationToken,
    },
  });
  await sendRegisterEmail(
    `${user.firstName} ${user.lastName}`,
    email,
    verificationToken
  );
};

interface RegisterActionProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
/**
 * Registers a new user.
 * @param {RegisterActionProps} props - The properties containing the required fields for adding a new user.
 * @param {string} props.firstName - The first name of the user.
 * @param {string} props.lastName - The last name of the user.
 * @param {string} props.email - The email of the user.
 * @param {string} props.phone - The phone number of the user.
 * @param {string} props.password - The password of the user.
 * @throws {Error} If any required fields are missing.
 */
export const registerAction = async (props: RegisterActionProps) => {
  const { firstName, lastName, email, phone, password } = props;
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const formattedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1);

  // Validate required fields
  if (
    !formattedFirstName ||
    !formattedLastName ||
    !email ||
    !phone ||
    !password
  ) {
    throw new Error("Missing required fields");
  }

  return await prisma.$transaction(async (prisma) => {
    // Check if the email is already in use
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("An user with this email already exists.");
    }

    const stripeCustomer = await stripe.customers.create({
      email,
      name: `${formattedFirstName} ${formattedLastName}`,
    });

    // Create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();
    await prisma.user.create({
      data: {
        firstName: formattedFirstName,
        lastName: formattedLastName,
        email,
        phone,
        password: hashedPassword,
        verificationToken,
        stripeCustomerId: stripeCustomer.id,
      },
    });

    // Send email to the user
    try {
      await sendRegisterEmail(
        `${formattedFirstName} ${formattedLastName}`,
        email,
        verificationToken
      );
    } catch (error) {
      throw new Error("Error sending welcome email");
    }
  });
};
