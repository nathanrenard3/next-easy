/**
 * @jest-environment node
 */

import prisma from "@/lib/db/prisma";
import {
  fetchProducts,
  fetchProductsByCategoryName,
} from "@/lib/db/queries/products-queries";

describe("Products queries tests", () => {
  const testCompanyId = `test-company-id-${Date.now()}`;
  const testLocationId = `test-location-id-${Date.now()}`;
  const testCategoryId = `test-category-id-${Date.now()}`;
  const testCategoryId2 = `test-category-id-${Date.now() + 1}`;
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

    await prisma.category.create({
      data: {
        id: testCategoryId,
        name: "Test Category",
        locationId: testLocationId,
      },
    });

    await prisma.category.create({
      data: {
        id: testCategoryId2,
        name: "Test Category 2",
        locationId: testLocationId,
      },
    });

    await prisma.product.createMany({
      data: [
        { name: "Product 1", categoryId: testCategoryId, price: 100 },
        { name: "Product 2", categoryId: testCategoryId, price: 200 },
        { name: "Product 3", categoryId: testCategoryId2, price: 300 },
        { name: "Product 4", categoryId: testCategoryId2, price: 400 },
      ],
    });
  });

  afterAll(async () => {
    // Clean up the database after the tests
    await prisma.product.deleteMany({
      where: { categoryId: testCategoryId },
    });

    await prisma.product.deleteMany({
      where: { categoryId: testCategoryId2 },
    });

    await prisma.category.delete({
      where: { id: testCategoryId },
    });

    await prisma.category.delete({
      where: { id: testCategoryId2 },
    });

    await prisma.location.delete({
      where: { id: testLocationId },
    });

    await prisma.company.delete({
      where: { id: testCompanyId },
    });
  });

  // ? fetchProducts tests
  it("should fetch products for a given location", async () => {
    const params = {
      locationId: testLocationId,
    };

    const products = await fetchProducts(params);

    expect(products).toHaveLength(4);
    expect(products[0].name).toBe("Product 1");
    expect(products[1].name).toBe("Product 2");
    expect(products[2].name).toBe("Product 3");
    expect(products[3].name).toBe("Product 4");
  });

  it("should fetch products for a given category name and location", async () => {
    const params = {
      locationId: testLocationId,
      categoryName: "Test Category",
    };

    const products = await fetchProductsByCategoryName(params);

    expect(products).toHaveLength(2);
    expect(products[0].name).toBe("Product 1");
    expect(products[1].name).toBe("Product 2");
  });

  it("should throw an error if category name is not provided", async () => {
    const params = {
      locationId: testLocationId,
    };

    await expect(fetchProductsByCategoryName(params)).rejects.toThrow(
      "Category name is required"
    );
  });
});
