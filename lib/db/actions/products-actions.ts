"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

/**
 * Adds a new product to the database.
 *
 * @param {FormData} formData - The form data containing the required fields for adding a new product.
 * @param {string} formData.categoryId - The ID of the category to add the product to.
 * @param {string} formData.name - The name of the product.
 * @param {string} formData.price - The price of the product.
 * @throws {Error} If any required fields are missing.
 */
export const addProductAction = async (formData: FormData) => {
  const categoryId = formData.get("categoryId") as string;
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;

  if (!categoryId || !name) {
    throw new Error("Missing required fields");
  }

  // Check if the product already exists
  const existingProduct = await prisma.product.findFirst({
    where: {
      name,
      categoryId,
    },
  });

  if (existingProduct) {
    if (existingProduct.deletedAt) {
      await prisma.product.update({
        where: {
          id: existingProduct.id,
        },
        data: {
          deletedAt: null,
        },
      });

      return revalidatePath("/dashboard/products");
    } else {
      throw new Error("Le produit existe déjà");
    }
  }

  await prisma.product.create({
    data: {
      name,
      categoryId,
      price: parseFloat(price),
    },
  });

  revalidatePath("/dashboard/products");
};

/**
 * Edits an existing product in the database.
 *
 * @param {string} categoryId - The ID of the product to be edited.
 * @param {FormData} formData - The form data containing the required fields for editing the product.
 * @param {string} formData.name - The new name of the product.
 * @param {string} formData.price - The new price of the product.
 * @param {string} formData.categoryId - The new category ID of the product.
 * @throws {Error} If any required fields are missing.
 */
export const editProductAction = async (
  productId: string,
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!productId || !name) {
    throw new Error("Missing required fields");
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name,
      price: parseFloat(price),
      categoryId,
    },
  });

  revalidatePath("/dashboard/products");
};

/**
 * Deletes an existing product from the database.
 *
 * @param {FormData} formData - The form data containing the required field for deleting the product.
 * @param {string} formData.productId - The ID of the product to be deleted.
 * @throws {Error} If the required field is missing.
 */
export const deleteProductAction = async (formData: FormData) => {
  const productId = formData.get("productId") as string;

  if (!productId) {
    throw new Error("Missing required fields");
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  revalidatePath("/dashboard/products");
};
