import { test, expect } from "@playwright/test";

// To skip the global setup
test.use({ storageState: { cookies: [], origins: [] } });

test("should show sign-in button", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: /connexion/i })).toBeVisible();
});

test("should redirect to sign-in page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /connexion/i }).click();
  await page.waitForURL("/sign-in");
  await expect(page).toHaveURL("/sign-in");
});

test("should show email error message", async ({ page }) => {
  await page.goto("/sign-in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("not-email");
  await page.getByRole("button", { name: /connexion/i }).click();
  const errorMessage = page.locator('[data-testid="email-message"]');
  await expect(errorMessage).toContainText("L'adresse email n'est pas valide");
});

test("should show password error message", async ({ page }) => {
  await page.goto("/sign-in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("n.renard38350@gmail.com");
  await page.getByPlaceholder("Mot de passe").click();
  await page.getByPlaceholder("Mot de passe").fill("");
  await page.getByRole("button", { name: /connexion/i }).click();
  const errorMessage = page.locator('[data-testid="password-message"]');
  await expect(errorMessage).toContainText("Le mot de passe est requis");
});

test("should show user not found error message", async ({ page }) => {
  await page.goto("/sign-in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("n.renard38350@gmail.com");
  await page.getByPlaceholder("Mot de passe").click();
  await page.getByPlaceholder("Mot de passe").fill("wrong-password");
  await page.getByRole("button", { name: /connexion/i }).click();
  const errorTitleMessage = page.locator('[data-testid="toast-title"]');
  const errorDescriptionMessage = page.locator(
    '[data-testid="toast-description"]'
  );
  await expect(errorTitleMessage).toContainText("Erreur de connexion");
  await expect(errorDescriptionMessage).toContainText(
    "L'adresse email ou le mot de passe est incorrect"
  );
});

test("should sign-in user", async ({ page }) => {
  await page.goto("/sign-in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("n.renard38350@gmail.com");
  await page.getByPlaceholder("Mot de passe").click();
  await page.getByPlaceholder("Mot de passe").fill("Password_dir1");
  await page.getByRole("button", { name: /connexion/i }).click();
  await page.waitForURL("/dashboard");
  await expect(page).toHaveURL("/dashboard");
});
