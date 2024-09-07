"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

/**
 * Adds a new category to the database.
 *
 * @param {FormData} formData - The form data containing the required fields for adding a new category.
 * @param {string} formData.locationId - The ID of the location to add the category to.
 * @param {string} formData.name - The name of the category.
 * @throws {Error} If any required fields are missing.
 */
export const addCategoryAction = async (formData: FormData) => {
  const locationId = formData.get("locationId") as string;
  const name = formData.get("name") as string;

  if (!locationId || !name) {
    throw new Error("Missing required fields");
  }

  // Check if the category already exists
  const existingCategory = await prisma.category.findFirst({
    where: {
      name,
      locationId,
    },
  });

  if (existingCategory) {
    if (existingCategory.deletedAt) {
      await prisma.category.update({
        where: {
          id: existingCategory.id,
        },
        data: {
          deletedAt: null,
        },
      });

      return revalidatePath("/dashboard/categories");
    } else {
      throw new Error("La catégorie existe déjà");
    }
  }

  await prisma.category.create({
    data: {
      name,
      locationId,
    },
  });

  revalidatePath("/dashboard/categories");
};

/**
 * Edits an existing category in the database.
 *
 * @param {string} categoryId - The ID of the category to be edited.
 * @param {FormData} formData - The form data containing the required fields for editing the category.
 * @param {string} formData.name - The new name of the category.
 * @throws {Error} If any required fields are missing.
 */
export const editCategoryAction = async (
  categoryId: string,
  formData: FormData
) => {
  const name = formData.get("name") as string;

  if (!categoryId || !name) {
    throw new Error("Missing required fields");
  }

  await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
    },
  });

  revalidatePath("/dashboard/categories");
};

/**
 * Deletes an existing category from the database.
 *
 * @param {FormData} formData - The form data containing the required field for deleting the category.
 * @param {string} formData.categoryId - The ID of the category to be deleted.
 * @throws {Error} If the required field is missing.
 */
export const deleteCategoryAction = async (formData: FormData) => {
  const categoryId = formData.get("categoryId") as string;

  if (!categoryId) {
    throw new Error("Missing required fields");
  }

  await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  revalidatePath("/dashboard/categories");
};
