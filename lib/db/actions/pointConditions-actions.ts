"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

/**
 * Adds a new point condition to the database.
 *
 * @param {FormData} formData - The form data containing the required fields for adding a point condition.
 * @param {boolean} condition.active - The new active status of the point condition.
 * @param {number} condition.points - The new points of the point condition.
 * @param {string} [condition.categoryId] - The new category ID of the point condition.
 * @param {string} [condition.productId] - The new product ID of the point condition.
 * @param {string} condition.trigger - The new trigger of the point condition.
 * @param {number} [condition.value] - The new value of the point condition.
 * @throws {Error} If any required fields are missing.
 */
export const addPointConditionAction = async (
  loyaltyProgramId: string,
  formData: FormData
) => {
  const points = parseInt(formData.get("points") as string, 10);
  const categoryId = formData.get("categoryId") as string | null;
  const productId = formData.get("productId") as string | null;
  const trigger = formData.get("trigger") as string;
  const value = formData.get("value")
    ? parseFloat(formData.get("value") as string)
    : null;

  // Validate required fields
  if (isNaN(points) || !trigger) {
    throw new Error("Missing or invalid required fields");
  }

  // Validate foreign key constraints
  if (categoryId) {
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      throw new Error("Category does not exist");
    }
  }

  if (productId) {
    const productExists = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!productExists) {
      throw new Error("Product does not exist");
    }
  }

  // Insert the new point condition into the database
  await prisma.pointCondition.create({
    data: {
      loyaltyProgramId,
      points,
      categoryId,
      productId,
      trigger,
      value,
    },
  });

  revalidatePath("/dashboard/loyalty-program");
};

/**
 * Edits multiple point conditions in the database.
 *
 * @param {Array} conditions - An array of conditions to be edited.
 * @param {Object} condition - An object representing a point condition.
 * @param {string} condition.id - The ID of the point condition to be edited.
 * @param {boolean} condition.active - The new active status of the point condition.
 * @param {number} condition.points - The new points of the point condition.
 * @param {string} [condition.categoryId] - The new category ID of the product.
 * @param {string} [condition.productId] - The new product ID of the product.
 * @param {string} condition.trigger - The new trigger of the point condition.
 * @param {number} [condition.value] - The new value of the point condition.
 * @throws {Error} If any required fields are missing or invalid.
 */
export const editPointsConditionsAction = async (
  conditions: Array<{
    id: string;
    active: boolean;
    points: number;
    categoryId?: string;
    productId?: string;
    trigger: string;
    value?: number;
  }>
) => {
  const updates = conditions.map(async (condition) => {
    const { id, active, points, categoryId, productId, trigger, value } =
      condition;

    // Validate required fields
    if (!id || isNaN(points) || !trigger) {
      throw new Error("Missing or invalid required fields");
    }

    // Validate foreign key constraints
    if (categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!categoryExists) {
        throw new Error("Category does not exist");
      }
    }

    if (productId) {
      const productExists = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!productExists) {
        throw new Error("Product does not exist");
      }
    }

    // Update the point condition in the database
    return prisma.pointCondition.update({
      where: { id },
      data: {
        active,
        points,
        categoryId: categoryId || null,
        productId: productId || null,
        trigger,
        value: value ?? null,
      },
    });
  });

  await Promise.all(updates);

  revalidatePath("/dashboard/loyalty-program");
};

/**
 * Deletes an existing point condition from the database.
 *
 * @param {FormData} formData - The form data containing the required field for deleting the product.
 * @param {string} formData.pointConditionId - The ID of the point condition to be deleted.
 * @throws {Error} If the required field is missing.
 */
export const deletePointConditionAction = async (formData: FormData) => {
  const pointConditionId = formData.get("pointConditionId") as string;

  if (!pointConditionId) {
    throw new Error("Missing required fields");
  }

  await prisma.pointCondition.update({
    where: {
      id: pointConditionId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  revalidatePath("/dashboard/loyalty-program");
};
