"use server";

import prisma from "@/lib/db/prisma";
import { OrderMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface AddOrderParams {
  products: { productId: string; quantity: number }[];
  finished: boolean;
  customerId: string | null;
  total: number;
  method: "cash" | "card" | "check";
  reduction: number;
}

/**
 * Adds a new order to the database.
 *
 * @param {AddOrderParams} params - The parameters required to add a new order.
 * @param {AddOrderParams["products"]} params.products - The products to add to the order.
 * @param {AddOrderParams["finished"]} params.finished - Whether the order is finished.
 * @param {AddOrderParams["customerId"]} params.customerId - The ID of the customer associated with the order.
 * @param {AddOrderParams["total"]} params.total - The total amount of the order.
 * @param {AddOrderParams["method"]} params.method - The payment method used for the order.
 * @param {AddOrderParams["reduction"]} params.reduction - The reduction applied to the order.
 * @throws {Error} If any required fields are missing.
 */
export const addOrderAction = async ({
  products,
  finished,
  customerId,
  total,
  method,
  reduction,
}: AddOrderParams) => {
  if (!products || products.length === 0 || !total || !method) {
    throw new Error("Missing required fields");
  }

  // Get full products
  const fullProducts = await prisma.product.findMany({
    where: {
      id: {
        in: products.map((product) => product.productId),
      },
    },
    include: {
      category: true,
    },
  });

  // Create order
  const order = await prisma.order.create({
    data: {
      finished,
      customerId: customerId || undefined,
      total,
      method: method.toUpperCase() as OrderMethod,
      reduction,
      products: {
        create: products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          vat: fullProducts.find((fp) => fp.id === product.productId)?.vat,
        })),
      },
    },
  });

  // If a customer is associated, check the point conditions
  if (customerId) {
    const pointConditions = await prisma.pointCondition.findMany({
      where: {
        loyaltyProgram: {
          location: {
            customers: {
              some: {
                id: customerId,
              },
            },
          },
        },
        active: true,
        deletedAt: null,
      },
    });

    let pointsEarned = 0;
    // DEBUG

    // Loop through conditions and check if they are triggered
    for (const condition of pointConditions) {
      switch (condition.trigger) {
        case "product":
          const productMatchingProducts = products.filter(
            (product) => product.productId === condition.productId
          );
          pointsEarned += productMatchingProducts.reduce(
            (sum, product) => sum + condition.points * product.quantity,
            0
          );
          break;
        case "category":
          const categoryMatchingProducts = products.filter(
            (product) =>
              fullProducts.find((fp) => fp.id === product.productId)
                ?.categoryId === condition.categoryId
          );
          pointsEarned += categoryMatchingProducts.reduce(
            (sum, product) => sum + condition.points * product.quantity,
            0
          );
          break;
        case "amount":
          if (total >= condition.value!) {
            // Count how many times the condition is met
            const timesMet = Math.floor(total / condition.value!);
            pointsEarned += condition.points * timesMet;
          }
          break;
      }
    }

    // Update customer points if points have been earned
    if (pointsEarned > 0) {
      await prisma.customer.update({
        where: { id: customerId },
        data: {
          pointsEarned: {
            increment: pointsEarned,
          },
        },
      });

      // Update order points earned
      await prisma.order.update({
        where: { id: order.id },
        data: {
          pointsEarned: pointsEarned,
        },
      });
    }
  }

  await revalidatePath("/", "layout");

  return order;
};
