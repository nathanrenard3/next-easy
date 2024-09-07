import prisma from "../prisma";

interface fetchCustomersParams {
  locationId: string;
}

/**
 * Find all customers associated with a given location. It returns a list of customers that match the specified criteria.
 *
 * @param {Object} params - The parameters for fetching customers.
 * @param {string} params.locationId - The ID of the location.
 * @returns {Promise<Array>} - A promise that resolves to an array of customers.
 *
 */
export async function fetchCustomers({ locationId }: fetchCustomersParams) {
  return await prisma.customer.findMany({
    where: {
      locationId: locationId,
      deletedAt: null,
    },
    include: {
      orders: {
        where: {
          finished: true,
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
}

interface fetchCustomerByIdParams {
  customerId: string;
  limit?: number;
}

/**
 * Find all customers associated with a given id. It returns a list of customers that match the specified criteria.
 *
 * @param {Object} params - The parameters for fetching customers.
 * @param {string} params.customerId - The ID of the customer.
 * @param {number} params.limit - The maximum number of customers to return.
 * @returns {Promise<Array>} - A promise that resolves to an array of customers.
 *
 */
export async function fetchCustomerById({
  customerId,
  limit,
}: fetchCustomerByIdParams) {
  return await prisma.customer.findFirst({
    where: {
      id: customerId,
      deletedAt: null,
    },
    include: {
      orders: {
        where: {
          finished: true,
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    take: limit,
  });
}
