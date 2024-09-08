import { test, expect } from "@playwright/test";

// To skip the global setup
test.use({ storageState: { cookies: [], origins: [] } });

test("example of a e2e test", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
});
