/**
 * @jest-environment node
 */

import prisma from "@/lib/db/prisma";
import { fetchCategories } from "@/lib/db/queries/categories-queries";

describe("Categories queries tests", () => {
  const testCompanyId = `test-company-id-${Date.now()}`;
  const testCompanyName = `Test Company ${Date.now()}`;
  const testLocationId = `test-location-id-${Date.now()}`;
  const testCategoryId1 = `test-category-id1-${Date.now()}`;
  const testCategoryId2 = `test-category-id2-${Date.now()}`;

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

    await prisma.category.createMany({
      data: [
        { id: testCategoryId1, name: "Category 1", locationId: testLocationId },
        { id: testCategoryId2, name: "Category 2", locationId: testLocationId },
      ],
    });
  });

  afterAll(async () => {
    // Clean up the database after the tests
    await prisma.category.deleteMany({
      where: { locationId: testLocationId },
    });

    await prisma.location.delete({
      where: { id: testLocationId },
    });

    await prisma.company.delete({
      where: { id: testCompanyId },
    });
  });

  // ? fetchCategories tests
  it("should fetch categories for a given location where the user is present", async () => {
    const params = {
      locationId: testLocationId,
    };

    const categories = await fetchCategories(params);

    expect(categories).toHaveLength(2);
    expect(categories[0].name).toBe("Category 1");
    expect(categories[1].name).toBe("Category 2");
  });

  it("should return an empty array if no categories are found for the given location", async () => {
    const params = {
      locationId: "non-existent-location-id",
    };

    const categories = await fetchCategories(params);

    expect(categories).toHaveLength(0);
  });
});
