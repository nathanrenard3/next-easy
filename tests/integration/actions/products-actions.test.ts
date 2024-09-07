/**
 * @jest-environment node
 */

import prisma from "@/lib/db/prisma";
import {
  addProductAction,
  editProductAction,
  deleteProductAction,
} from "@/lib/db/actions/products-actions";
import { revalidatePath } from "next/cache";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Product actions tests", () => {
  const testCompanyId = `test-company-id-${Date.now()}`;
  const testLocationId = `test-location-id-${Date.now()}`;
  const testCategoryId = `test-category-id-${Date.now()}`;
  const testProductId = `test-product-id-${Date.now()}`;
  const testCompanyName = `Test Company ${Date.now()}`;
  const testProductName = "Test Product";
  const testProductPrice = "99.99";

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

    await prisma.product.create({
      data: {
        id: testProductId,
        name: testProductName,
        categoryId: testCategoryId,
        price: parseFloat(testProductPrice),
      },
    });
  });

  afterAll(async () => {
    // Clean up the database after the tests
    await prisma.product.deleteMany({
      where: { categoryId: testCategoryId },
    });

    await prisma.category.delete({
      where: { id: testCategoryId },
    });

    await prisma.location.delete({
      where: { id: testLocationId },
    });

    await prisma.company.delete({
      where: { id: testCompanyId },
    });
  });

  // addProductAction tests
  it("should add a new product", async () => {
    const formData = new FormData();
    formData.append("categoryId", testCategoryId);
    formData.append("name", "New Test Product");
    formData.append("price", "49.99");

    await addProductAction(formData);

    const newProduct = await prisma.product.findFirst({
      where: { name: "New Test Product", categoryId: testCategoryId },
    });

    expect(newProduct).not.toBeNull();
    expect(newProduct?.name).toBe("New Test Product");
    expect(newProduct?.price).toBe(49.99);

    // Should revalidate the path
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/products");
  });

  it("should throw an error if required fields are missing when adding a product", async () => {
    const formData = new FormData();
    formData.append("name", "Incomplete Test Product");

    await expect(addProductAction(formData)).rejects.toThrow(
      "Missing required fields"
    );
  });

  it("should throw an error if the product already exists and is not deleted", async () => {
    const formData = new FormData();
    formData.append("categoryId", testCategoryId);
    formData.append("name", testProductName);
    formData.append("price", testProductPrice);

    await expect(addProductAction(formData)).rejects.toThrow(
      "Le produit existe déjà"
    );
  });

  it("should restore a deleted product if it already exists", async () => {
    await prisma.product.update({
      where: { id: testProductId },
      data: { deletedAt: new Date() },
    });

    const formData = new FormData();
    formData.append("categoryId", testCategoryId);
    formData.append("name", testProductName);
    formData.append("price", testProductPrice);

    await addProductAction(formData);

    const restoredProduct = await prisma.product.findFirst({
      where: { name: testProductName, categoryId: testCategoryId },
    });

    expect(restoredProduct).not.toBeNull();
    expect(restoredProduct?.deletedAt).toBeNull();

    // Should revalidate the path
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/products");
  });

  // editProductAction tests
  it("should edit an existing product", async () => {
    const formData = new FormData();
    formData.append("name", "Updated Test Product");
    formData.append("price", "79.99");
    formData.append("categoryId", testCategoryId);

    await editProductAction(testProductId, formData);

    const updatedProduct = await prisma.product.findUnique({
      where: { id: testProductId },
    });

    expect(updatedProduct).not.toBeNull();
    expect(updatedProduct?.name).toBe("Updated Test Product");
    expect(updatedProduct?.price).toBe(79.99);

    // Should revalidate the path
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/products");
  });

  it("should throw an error if required fields are missing when editing a product", async () => {
    const formData = new FormData();
    formData.append("name", "");

    await expect(editProductAction(testProductId, formData)).rejects.toThrow(
      "Missing required fields"
    );
  });

  // deleteProductAction tests
  it("should delete an existing product", async () => {
    const formData = new FormData();
    formData.append("productId", testProductId);

    await deleteProductAction(formData);

    const deletedProduct = await prisma.product.findUnique({
      where: { id: testProductId },
    });

    expect(deletedProduct).not.toBeNull();
    expect(deletedProduct?.deletedAt).not.toBeNull();

    // Should revalidate the path
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/products");
  });

  it("should throw an error if required fields are missing when deleting a product", async () => {
    const formData = new FormData();

    await expect(deleteProductAction(formData)).rejects.toThrow(
      "Missing required fields"
    );
  });
});
