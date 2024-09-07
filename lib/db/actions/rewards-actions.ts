"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

/**
 * Adds a new reward to the database.
 *
 * @param {FormData} formData - The form data containing the required fields for adding a new reward.
 * @param {boolean} condition.active - The new active status of the reward.
 * @param {number} condition.points - The new points of the reward.
 * @param {string} [condition.categoryId] - The new category ID of the reward.
 * @param {string} [condition.productId] - The new product ID of the reward.
 * @param {string} condition.trigger - The new trigger of the reward.
 * @param {number} [condition.value] - The new value of the reward.
 * @throws {Error} If any required fields are missing.
 */
export const addRewardAction = async (
  loyaltyProgramId: string,
  formData: FormData
) => {
  const pointsCost = parseInt(formData.get("pointsCost") as string, 10);
  const categoryId = formData.get("categoryId") as string | null;
  const productId = formData.get("productId") as string | null;
  const trigger = formData.get("trigger") as string;
  const value = formData.get("value")
    ? parseInt(formData.get("value") as string)
    : null;

  // Validate required fields
  if (isNaN(pointsCost) || !trigger) {
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
  await prisma.reward.create({
    data: {
      loyaltyProgramId,
      pointsCost,
      categoryId,
      productId,
      trigger,
      value,
    },
  });

  revalidatePath("/dashboard/loyalty-program");
};

/**
 * Edits multiple rewards in the database.
 *
 * @param {Array} conditions - An array of rewards to be edited.
 * @param {Object} condition - An object representing a reward.
 * @param {string} condition.id - The ID of the reward to be edited.
 * @param {boolean} condition.active - The new active status of the reward.
 * @param {number} condition.points - The new points of thereward.
 * @param {string} [condition.categoryId] - The new category ID of the reward.
 * @param {string} [condition.productId] - The new product ID of the reward.
 * @param {string} condition.trigger - The new trigger of the reward.
 * @param {number} [condition.value] - The new value of the reward.
 * @throws {Error} If any required fields are missing or invalid.
 */
export const editRewardsAction = async (
  rewards: Array<{
    id: string;
    active: boolean;
    pointsCost: number;
    categoryId?: string;
    productId?: string;
    trigger: string;
    value?: number;
  }>
) => {
  const updates = rewards.map(async (reward) => {
    const { id, active, pointsCost, categoryId, productId, trigger, value } =
      reward;

    // Validate required fields
    if (!id || isNaN(pointsCost) || !trigger) {
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

    // Update the reward in the database
    return prisma.reward.update({
      where: { id },
      data: {
        active,
        pointsCost,
        categoryId: categoryId || null,
        productId: productId || null,
        trigger,
        value: value ?? null,
      },
    });
  });

  await Promise.all(updates);

  await revalidatePath("/dashboard/loyalty-program");
};

/**
 * Deletes an existing reward from the database.
 *
 * @param {FormData} formData - The form data containing the required field for deleting the reward.
 * @param {string} formData.rewardId - The ID of the reward to be deleted.
 * @throws {Error} If the required field is missing.
 */
export const deleteRewardAction = async (formData: FormData) => {
  const rewardId = formData.get("rewardId") as string;

  if (!rewardId) {
    throw new Error("Missing required fields");
  }

  await prisma.reward.update({
    where: {
      id: rewardId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  await revalidatePath("/dashboard/loyalty-program");
};

interface RewardActivation {
  rewardId: string;
  customerId: string;
  pointsCost: number;
}

/**
 * Activates a reward in the database.
 *
 * @param {string} rewardId - The ID of the reward to be activated.
 * @param {string} customerId - The ID of the customer who activated the reward.
 * @param {number} pointsCost - The cost of the reward in points.
 * @throws {Error} If the required field is missing.
 */
export const activateRewardAction = async ({
  rewardId,
  customerId,
  pointsCost,
}: RewardActivation) => {
  if (!rewardId || !customerId) {
    throw new Error("Missing required fields");
  }

  // Update the customer's points
  await prisma.customer.update({
    where: { id: customerId },
    data: {
      pointsSpent: {
        increment: pointsCost,
      },
    },
  });

  await revalidatePath("/cash-register");
};
