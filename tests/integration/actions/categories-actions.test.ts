/**
 * @jest-environment node
 */

import prisma from "@/lib/db/prisma";
import {
  addCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
} from "@/lib/db/actions/categories-actions";
import { revalidatePath } from "next/cache";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Category Actions Tests", () => {
  const testCompanyId = `test-company-id-${Date.now()}`;
  const testLocationId = `test-location-id-${Date.now()}`;
  const testCategoryId = `test-category-id-${Date.now()}`;
  const testCompanyName = `Test Company ${Date.now()}`;
  const testCategoryName = `Test Category ${Date.now()}`;

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
        name: testCategoryName,
        locationId: testLocationId,
      },
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

  // ? addCategoryAction
  it("should add a new category", async () => {
    const formData = new FormData();
    formData.append("locationId", testLocationId);
    formData.append("name", "New Test Category");

    await addCategoryAction(formData);

    const newCategory = await prisma.category.findFirst({
      where: {
        locationId: testLocationId,
        name: "New Test Category",
      },
    });

    expect(newCategory).not.toBeNull();
    expect(newCategory?.name).toBe("New Test Category");

    // Should revalidate the path
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/categories");
  });

  it("should not add a category with missing fields", async () => {
    const formData = new FormData();
    formData.append("locationId", testLocationId);

    await expect(addCategoryAction(formData)).rejects.toThrow(
      "Missing required fields"
    );
  });

  it("should revive a deleted category", async () => {
    // First delete the category
    await prisma.category.update({
      where: { id: testCategoryId },
      data: { deletedAt: new Date() },
    });

    const formData = new FormData();
    formData.append("locationId", testLocationId);
    formData.append("name", testCategoryName);

    await addCategoryAction(formData);

    const revivedCategory = await prisma.category.findUnique({
      where: { id: testCategoryId },
    });

    expect(revivedCategory).not.toBeNull();
    expect(revivedCategory?.deletedAt).toBeNull();

    // Should revalidate the path
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/categories");
  });

  it("should not add an existing category", async () => {
    const formData = new FormData();
    formData.append("locationId", testLocationId);
    formData.append("name", testCategoryName);

    await expect(addCategoryAction(formData)).rejects.toThrow(
      "La catégorie existe déjà"
    );
  });

  // ? editCategoryAction
  it("should edit an existing category", async () => {
    const formData = new FormData();
    formData.append("name", "Updated Test Category");

    await editCategoryAction(testCategoryId, formData);

    const updatedCategory = await prisma.category.findUnique({
      where: { id: testCategoryId },
    });

    expect(updatedCategory).not.toBeNull();
    expect(updatedCategory?.name).toBe("Updated Test Category");

    // Should revalidate the path
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/categories");
  });

  it("should not edit a category with missing fields", async () => {
    const formData = new FormData();

    await expect(editCategoryAction(testCategoryId, formData)).rejects.toThrow(
      "Missing required fields"
    );
  });

  // ? deleteCategoryAction
  it("should delete an existing category", async () => {
    const formData = new FormData();
    formData.append("categoryId", testCategoryId);

    await deleteCategoryAction(formData);

    const deletedCategory = await prisma.category.findUnique({
      where: { id: testCategoryId },
    });

    expect(deletedCategory).not.toBeNull();
    expect(deletedCategory?.deletedAt).not.toBeNull();

    // Should revalidate the path
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/categories");
  });

  it("should not delete a category with missing fields", async () => {
    const formData = new FormData();

    await expect(deleteCategoryAction(formData)).rejects.toThrow(
      "Missing required fields"
    );
  });
});
