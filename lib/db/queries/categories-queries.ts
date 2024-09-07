import prisma from "../prisma";

interface Params {
  locationId: string;
}

/**
 * Find all categories associated with a given location. It returns a list of categories that match the specified criteria.
 *
 * @param {Object} params - The parameters for fetching categories.
 * @param {string} params.locationId - The ID of the location.
 * @returns {Promise<Array>} - A promise that resolves to an array of categories.
 *
 */
export async function fetchCategories({ locationId }: Params) {
  return await prisma.category.findMany({
    where: {
      location: {
        id: locationId,
      },
      deletedAt: null,
    },
  });
}
