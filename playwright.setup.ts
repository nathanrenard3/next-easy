import { Browser, chromium, Page } from "@playwright/test";

const baseUrl = "http://localhost:3000";
const storagePath = "./tests/e2e/.config/playwright.storage.json";

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto(baseUrl + "/sign-in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("n.renard38350@gmail.com");
  await page.getByPlaceholder("Mot de passe").click();
  await page.getByPlaceholder("Mot de passe").fill("Password_dir1");
  await page.getByRole("button", { name: /connexion/i }).click();
  await page.waitForURL(baseUrl + "/dashboard");

  await context.storageState({ path: storagePath });
  await browser.close();
}

export default globalSetup;
