/**
 * @jest-environment node
 */

import prisma from "@/lib/db/prisma";
import {
  updateLocationAction,
  updateOpeningHoursAction,
} from "@/lib/db/actions/locations-actions";
import { revalidatePath } from "next/cache";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Location actions tests", () => {
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
        name: "Initial Test Location",
        address: "123 Initial Test St",
        city: "Initial Test City",
      },
    });

    await prisma.openingHours.create({
      data: {
        locationId: testLocationId,
        day: "Monday",
        morningOpen: "09:00",
        morningClose: "12:00",
        afternoonOpen: "13:00",
        afternoonClose: "17:00",
      },
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

  // ? updateLocationAction tests
  it("should update location information", async () => {
    const formData = new FormData();
    formData.append("name", "Updated Test Location");
    formData.append("address", "123 Updated Test St");
    formData.append("city", "Updated Test City");
    formData.append("locationId", testLocationId);

    await updateLocationAction(formData);

    const updatedLocation = await prisma.location.findUnique({
      where: { id: testLocationId },
    });

    expect(updatedLocation).not.toBeNull();
    expect(updatedLocation?.name).toBe("Updated Test Location");
    expect(updatedLocation?.address).toBe("123 Updated Test St");
    expect(updatedLocation?.city).toBe("Updated Test City");

    // Should revalidate the path
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/location");
  });

  // ? updateOpeningHoursAction tests
  it("should update opening hours of a location", async () => {
    const openingHours = JSON.stringify([
      {
        day: "Monday",
        morningOpen: "08:00",
        morningClose: "11:00",
        afternoonOpen: "12:00",
        afternoonClose: "16:00",
      },
      {
        day: "Tuesday",
        morningOpen: "09:00",
        morningClose: "12:00",
        afternoonOpen: "13:00",
        afternoonClose: "17:00",
      },
    ]);

    const formData = new FormData();
    formData.append("locationId", testLocationId);
    formData.append("openingHours", openingHours);

    await updateOpeningHoursAction(formData);

    const updatedOpeningHours = await prisma.openingHours.findMany({
      where: { locationId: testLocationId },
    });

    expect(updatedOpeningHours).toHaveLength(2);

    const mondayHours = updatedOpeningHours.find(
      (hours) => hours.day === "Monday"
    );
    const tuesdayHours = updatedOpeningHours.find(
      (hours) => hours.day === "Tuesday"
    );

    expect(mondayHours).not.toBeNull();
    expect(mondayHours?.morningOpen).toBe("08:00");
    expect(mondayHours?.morningClose).toBe("11:00");
    expect(mondayHours?.afternoonOpen).toBe("12:00");
    expect(mondayHours?.afternoonClose).toBe("16:00");

    expect(tuesdayHours).not.toBeNull();
    expect(tuesdayHours?.morningOpen).toBe("09:00");
    expect(tuesdayHours?.morningClose).toBe("12:00");
    expect(tuesdayHours?.afternoonOpen).toBe("13:00");
    expect(tuesdayHours?.afternoonClose).toBe("17:00");

    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/location");
  });
});
