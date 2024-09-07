"use server";

import { stripe } from "@/lib/stripe";
import prisma from "../prisma";
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

/**
 * Registers a new user.
 * @param {FormData} formData - The form data containing the required fields for adding a new reward.
 * @param {string} formData.nameCompany - The name of the company.
 * @param {string} formData.address - The address of the company.
 * @param {string} formData.city - The city of the company.
 * @param {string} formData.postalCode - The postal code of the company.
 * @param {string} formData.firstName - The first name of the company's contact person.
 * @param {string} formData.lastName - The last name of the company's contact person.
 * @param {string} formData.email - The email of the company's contact person.
 * @param {string} formData.phone - The phone number of the company's contact person.
 * @param {string} formData.password - The password of the company's contact person.
 * @param {string | null} formData.priceId - The price id of the subscription.
 * @throws {Error} If any required fields are missing.
 */
export const registerAction = async (formData: FormData) => {
  const nameCompany = formData.get("nameCompany") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const postalCode = formData.get("postalCode") as string;
  const firstName =
    (formData.get("firstName") as string).charAt(0).toUpperCase() +
    (formData.get("firstName") as string).slice(1);
  const lastName =
    (formData.get("lastName") as string).charAt(0).toUpperCase() +
    (formData.get("lastName") as string).slice(1);
  const email = (formData.get("email") as string).toLowerCase();
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  // Validate required fields
  if (
    !nameCompany ||
    !address ||
    !city ||
    !postalCode ||
    !firstName ||
    !lastName ||
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
      throw new Error("Un utilisateur avec cette adresse e-mail existe déjà.");
    }

    const stripeCustomer = await stripe.customers.create({
      email,
      name: `${firstName} ${lastName}`,
    });

    // First create the company
    const company = await prisma.company.create({
      data: {
        name: nameCompany,
        logo: "",
        stripeCustomerId: stripeCustomer.id,
      },
    });

    // Then create the location
    const location = await prisma.location.create({
      data: {
        companyId: company.id,
        address: address,
        city,
        postalCode,
      },
    });

    // We create all opening hours for the location
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    await prisma.openingHours.createMany({
      data: daysOfWeek.map((day) => ({
        locationId: location.id,
        day: day,
        morningOpen: null,
        morningClose: null,
        afternoonOpen: null,
        afternoonClose: null,
      })),
    });

    // We create the loyalty program for the location
    await prisma.loyaltyProgram.create({
      data: {
        locationId: location.id,
        name: "Programme de fidélité",
      },
    });

    // Create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        verificationToken,
        locations: {
          connect: {
            id: location.id,
          },
        },
      },
    });

    // Send email to the user
    try {
      await sendRegisterEmail(
        `${firstName} ${lastName}`,
        email,
        verificationToken
      );
    } catch (error) {
      throw new Error("Erreur lors de l'envoi de l'email de bienvenue");
    }
  });
};
