import prisma from "../prisma";

interface fetchProductsParams {
  locationId: string;
  categoryName?: string;
}

/**
 * Find products associated with the given location ID.
 *
 * @param {Object} params - The parameters for fetching location.
 * @param {string} params.locationId - The ID of the location.
 * @returns {Promise<Object>} - A promise that resolves to the location.
 */
export async function fetchProducts({ locationId }: fetchProductsParams) {
  return await prisma.product.findMany({
    where: {
      category: {
        locationId: locationId,
      },
      deletedAt: null,
    },
    orderBy: {
      category: {
        name: "asc",
      },
    },
  });
}

/**
 * Find products associated with the given category name and location ID.
 *
 * @param {Object} params - The parameters for fetching location.
 * @param {string} params.locationId - The ID of the location.
 * @param {string} params.categoryName - The name of the category.
 * @returns {Promise<Object>} - A promise that resolves to the location.
 */
export async function fetchProductsByCategoryName({
  locationId,
  categoryName,
}: fetchProductsParams) {
  if (!categoryName) {
    throw new Error("Category name is required");
  }

  const decodedCategoryName = decodeURIComponent(categoryName).toLowerCase();

  return await prisma.product.findMany({
    where: {
      category: {
        locationId: locationId,
        name: {
          mode: "insensitive",
          equals: decodedCategoryName,
        },
      },
      deletedAt: null,
    },
  });
}
