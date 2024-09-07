import prisma from "../prisma";

interface fetchOrdersParams {
  locationId: string;
  limit?: number;
}

/**
 * Find all orders associated with a given location id. It returns a list of orders that match the specified criteria.
 *
 * @param {Object} params - The parameters for fetching orders.
 * @param {string} params.locationId - The ID of the location.
 * @param {number} [params.limit] - The maximum number of orders to return.
 * @returns {Promise<Array>} - A promise that resolves to an array of orders.
 */
export async function fetchOrders({ locationId, limit }: fetchOrdersParams) {
  return await prisma.order.findMany({
    where: {
      products: {
        some: {
          product: {
            category: {
              locationId: locationId,
            },
          },
        },
      },
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}
