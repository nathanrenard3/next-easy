import prisma from "../prisma";

interface fetchLocationParams {
  locationId: string;
}

/**
 * Find the location associated with the given ID.
 *
 * @param {Object} params - The parameters for fetching location.
 * @param {string} params.locationId - The ID of the location.
 * @returns {Promise<Object>} - A promise that resolves to the location.
 *
 */
export async function fetchLocation({ locationId }: fetchLocationParams) {
  return await prisma.location.findUnique({
    where: {
      id: locationId,
    },
  });
}

interface fetchAllLocationsParams {
  companyId: string;
}

export async function fetchAllLocations({
  companyId,
}: fetchAllLocationsParams) {
  return await prisma.location.findMany({
    where: {
      companyId: companyId,
      deletedAt: null,
    },
  });
}

/**
 * Find the location associated with the given ID.
 * Include the opening hours associated with the location.
 *
 * @param {Object} params - The parameters for fetching location.
 * @param {string} params.locationId - The ID of the location.
 * @returns {Promise<Object>} - A promise that resolves to the location.
 */
export async function fetchLocationWithOpeningHours({
  locationId,
}: fetchLocationParams) {
  return await prisma.location.findUnique({
    where: {
      id: locationId,
    },
    include: {
      openingHours: true,
    },
  });
}

/**
 * Find the location associated with the given ID.
 * Include the company associated with the location.
 *
 * @param {Object} params - The parameters for fetching location.
 * @param {string} params.locationId - The ID of the location.
 * @returns {Promise<Object>} - A promise that resolves to the location.
 */
export async function fetchLocationWithCompany({
  locationId,
}: fetchLocationParams) {
  return await prisma.location.findUnique({
    where: {
      id: locationId,
    },
    include: {
      company: true,
    },
  });
}

/**
 * Find the location associated with the given ID.
 * Include the company associated with the location.
 * Include the opening hours associated with the location.
 *
 */
export async function fetchLocationWithCompanyAndOpeningHours({
  locationId,
}: fetchLocationParams) {
  return await prisma.location.findUnique({
    where: {
      id: locationId,
    },
    include: {
      company: true,
      openingHours: true,
    },
  });
}
