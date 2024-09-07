import prisma from "../prisma";

interface Params {
  locationId: string;
}

/**
 * Find the loyalty program for a location.
 *
 * @param {Object} params - The parameters for fetching location.
 * @param {string} params.locationId - The ID of the location.
 * @returns {Promise<Object>} - A promise that resolves to the location.
 *
 */
export async function fetchLoyaltyProgram({ locationId }: Params) {
  return await prisma.loyaltyProgram.findFirst({
    where: {
      locationId,
    },
    include: {
      pointConditions: {
        where: {
          deletedAt: null,
        },
        orderBy: {
          points: "asc",
        },
      },
      rewards: {
        where: {
          deletedAt: null,
        },
        orderBy: {
          pointsCost: "asc",
        },
      },
    },
  });
}
