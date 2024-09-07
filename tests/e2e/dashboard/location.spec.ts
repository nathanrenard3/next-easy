import { expect, test } from "@playwright/test";

test.use({ storageState: "./tests/e2e/.config/playwright.storage.json" });

test.beforeEach(async ({ page }) => {
  await page.goto("/dashboard");
  await page.getByRole("link", { name: "Information du commerce" }).click();
  await expect(page.getByText("DashboardLocationInformations")).toBeVisible();
});

test("should show location informations", async ({ page }) => {
  await expect(
    page.locator("div").filter({ hasText: /^Nom du commerce$/ })
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^Adresse$/ })
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^Ville$/ })
  ).toBeVisible();
});

test("should need to fill all fields", async ({ page }) => {
  await page.getByPlaceholder("Nom du commerce").click();
  await page.getByPlaceholder("Nom du commerce").clear();
  await page.getByTestId("modify-location-button").click();
  const errorMessage = page.locator('[data-testid="location-message"]');
  await expect(errorMessage).toContainText("Le nom est requis");
});
