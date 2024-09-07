"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

/**
 * Adds a new customer to the database.
 *
 * @param {FormData} formData - The form data containing the required fields for adding a new customer.
 * @param {string} formData.locationId - The ID of the location to add the customer to.
 * @param {string} formData.firstName - The first name of the customer.
 * @param {string} formData.lastName - The last name of the customer.
 * @param {string} formData.email - The email of the customer.
 * @param {string} formData.phone - The phone number of the customer.
 * @throws {Error} If any required fields are missing.
 */
export const addCustomerAction = async (formData: FormData) => {
  const locationId = formData.get("locationId") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!locationId || !firstName || !lastName || !email || !phone) {
    throw new Error("Missing required fields");
  }

  // Check if the customer already exists
  const existingCustomer = await prisma.customer.findFirst({
    where: {
      email,
    },
  });

  if (existingCustomer) {
    if (existingCustomer.deletedAt) {
      await prisma.customer.update({
        where: {
          id: existingCustomer.id,
        },
        data: {
          deletedAt: null,
        },
      });

      return revalidatePath("/dashboard/customers");
    } else {
      throw new Error("La fiche client existe déjà");
    }
  }

  const newCustomer = await prisma.customer.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      locationId,
    },
  });

  revalidatePath("/dashboard/customers");

  return newCustomer;
};

/**
 * Edits an existing customer in the database.
 *
 * @param {string} customerId - The ID of the customer to be edited.
 * @param {FormData} formData - The form data containing the required fields for editing the customer.
 * @param {string} formData.firstName - The first name of the customer.
 * @param {string} formData.lastName - The last name of the customer.
 * @param {string} formData.email - The email of the customer.
 * @param {string} formData.phone - The phone number of the customer.
 * @param {string} formData.pointsAdded - The number of points to add to the customer's balance.
 * @throws {Error} If any required fields are missing.
 */
export const editCustomerAction = async (
  customerId: string,
  formData: FormData
) => {
  const firstName = formData.get("firstName") as string | null;
  const lastName = formData.get("lastName") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const pointsAdded = formData.get("pointsAdded") as string | null;

  if (!customerId) {
    throw new Error("Missing required fields");
  }

  const data: any = {};

  if (firstName) {
    data.firstName = firstName;
  }

  if (lastName) {
    data.lastName = lastName;
  }

  if (email) {
    data.email = email;
  }

  if (phone) {
    data.phone = phone;
  }

  if (pointsAdded) {
    data.pointsEarned = {
      increment: parseInt(pointsAdded),
    };
  }

  await prisma.customer.update({
    where: {
      id: customerId,
    },
    data: data,
  });

  revalidatePath("/dashboard/customers");
};

/**
 * Deletes an existing customer from the database.
 *
 * @param {FormData} formData - The form data containing the required field for deleting the customer.
 * @param {string} formData.customerId - The ID of the customer to be deleted.
 * @throws {Error} If the required field is missing.
 */
export const deleteCustomerAction = async (formData: FormData) => {
  const customerId = formData.get("customerId") as string;

  if (!customerId) {
    throw new Error("Missing required fields");
  }

  await prisma.customer.update({
    where: {
      id: customerId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  revalidatePath("/dashboard/customers");
};
