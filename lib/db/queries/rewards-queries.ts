import prisma from "@/lib/db/prisma";

interface fetchRewardsParams {
  locationId: string;
}

/**
 * Find all the rewards for a location.
 *
 * @param {Object} params - The parameters for fetching location.
 * @param {string} params.locationId - The ID of the location.
 * @returns {Promise<Object>} - A promise that resolves to the location.
 *
 */
export async function fetchRewards({ locationId }: fetchRewardsParams) {
  return await prisma.reward.findMany({
    where: {
      loyaltyProgram: {
        locationId,
      },
      active: true,
      deletedAt: null,
    },
    include: {
      product: true,
      category: true,
    },
  });
}
