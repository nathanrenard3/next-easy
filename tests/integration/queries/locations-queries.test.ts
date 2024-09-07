/**
 * @jest-environment node
 */

import prisma from "@/lib/db/prisma";
import {
  fetchLocation,
  fetchLocationWithOpeningHours,
} from "@/lib/db/queries/locations-queries";

describe("Locations queries tests", () => {
  const testCompanyId = `test-company-id-${Date.now()}`;
  const testLocationId = `test-location-id-${Date.now()}`;
  const testCompanyName = `Test Company ${Date.now()}`;

  beforeAll(async () => {
    // Create test data in the database
    await prisma.company.create({
      data: {
        id: testCompanyId,
        name: testCompanyName,
        currentLicenses: 1,
        initialLicenses: 1,
        logo: "test-logo",
      },
    });

    await prisma.location.create({
      data: {
        id: testLocationId,
        companyId: testCompanyId,
        latitude: 40.7128,
        longitude: -74.006,
        name: "Test Location",
        address: "123 Test St",
        city: "Test City",
      },
    });

    await prisma.openingHours.createMany({
      data: [
        {
          locationId: testLocationId,
          day: "Monday",
          morningOpen: "09:00",
          morningClose: "12:00",
          afternoonOpen: "13:00",
          afternoonClose: "17:00",
        },
        {
          locationId: testLocationId,
          day: "Tuesday",
          morningOpen: "09:00",
          morningClose: "12:00",
          afternoonOpen: "13:00",
          afternoonClose: "17:00",
        },
      ],
    });
  });

  afterAll(async () => {
    // Clean up the database after the tests
    await prisma.openingHours.deleteMany({
      where: { locationId: testLocationId },
    });

    await prisma.location.delete({
      where: { id: testLocationId },
    });

    await prisma.company.delete({
      where: { id: testCompanyId },
    });
  });

  // ? fetchLocation tests
  it("should fetch location by ID", async () => {
    const params = { locationId: testLocationId };

    const location = await fetchLocation(params);

    expect(location).not.toBeNull();
    expect(location?.id).toBe(testLocationId);
    expect(location?.name).toBe("Test Location");
  });

  // ? fetchLocationWithOpeningHours tests
  it("should fetch location with opening hours by ID", async () => {
    const params = { locationId: testLocationId };

    const locationWithHours = await fetchLocationWithOpeningHours(params);

    expect(locationWithHours).not.toBeNull();
    expect(locationWithHours?.id).toBe(testLocationId);
    expect(locationWithHours?.openingHours).toHaveLength(2);
    expect(locationWithHours?.openingHours[0].day).toBe("Monday");
    expect(locationWithHours?.openingHours[1].day).toBe("Tuesday");
  });
});
