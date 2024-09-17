import { exec } from "node:child_process";
import { promises as fs } from "node:fs";
import { promisify } from "node:util";
import readline from "node:readline";
import crypto from "node:crypto";
import path from "node:path";
import chalk from "chalk";

const execAsync = promisify(exec);

function question(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function checkStripeCLI() {
  console.log(
    chalk.blue.bold(
      "\nStep 1: Checking if Stripe CLI is installed and authenticated..."
    )
  );
  try {
    await execAsync("stripe --version");
    console.log(chalk.green("✔ Stripe CLI is installed."));

    // Check if Stripe CLI is authenticated
    try {
      await execAsync("stripe config --list");
      console.log(chalk.green("✔ Stripe CLI is authenticated."));
    } catch (error) {
      console.log(
        chalk.red(
          "✘ Stripe CLI is not authenticated or the authentication has expired."
        )
      );
      console.log(chalk.yellow("Please run: stripe login"));
      const answer = await question(
        "Have you completed the authentication? (y/n): "
      );
      if (answer.toLowerCase() !== "y") {
        console.log(
          chalk.red(
            "✘ Please authenticate with Stripe CLI and run this script again."
          )
        );
        process.exit(1);
      }

      // Verify authentication after user confirms login
      try {
        await execAsync("stripe config --list");
        console.log(chalk.green("✔ Stripe CLI authentication confirmed."));
      } catch (error) {
        console.error(
          chalk.red(
            "✘ Failed to verify Stripe CLI authentication. Please try again."
          )
        );
        process.exit(1);
      }
    }
  } catch (error) {
    console.error(
      chalk.red(
        "✘ Stripe CLI is not installed. Please install it and try again."
      )
    );
    console.log(chalk.yellow("To install Stripe CLI, follow these steps:"));
    console.log("1. Visit: https://docs.stripe.com/stripe-cli");
    console.log(
      "2. Download and install the Stripe CLI for your operating system"
    );
    console.log("3. After installation, run: stripe login");
    console.log(
      "After installation and authentication, please run this setup script again."
    );
    process.exit(1);
  }
}

async function getDatabaseURLs(): Promise<{
  DATABASE_URL: string;
  DIRECT_URL: string;
}> {
  console.log(chalk.blue.bold("\nStep 2: Getting Database URLs"));
  console.log(
    chalk.yellow(
      "You can find Postgres databases at: https://vercel.com/marketplace?category=databases"
    )
  );
  const DATABASE_URL = await question("Enter your DATABASE_URL: ");
  const DIRECT_URL = await question("Enter your DIRECT_URL: ");
  return { DATABASE_URL, DIRECT_URL };
}

async function createStripeWebhook(): Promise<string> {
  console.log(chalk.magenta.bold("\nCreating Stripe webhook..."));
  try {
    const { stdout } = await execAsync("stripe listen --print-secret");
    const match = stdout.match(/whsec_[a-zA-Z0-9]+/);
    if (!match) {
      throw new Error("Failed to extract Stripe webhook secret");
    }
    console.log(chalk.green("✔ Stripe webhook created successfully."));
    return match[0];
  } catch (error) {
    console.error(
      chalk.red(
        "✘ Failed to create Stripe webhook. Please check your Stripe CLI installation and permissions."
      )
    );
    console.log(
      chalk.yellow(
        "Note: On Windows, you may need to run this script as an administrator."
      )
    );
    throw error;
  }
}

async function getStripeKeys(): Promise<{
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
}> {
  console.log(chalk.blue.bold("\nStep 3: Getting Stripe Keys"));
  console.log(
    chalk.yellow(
      "You can find your Stripe Secret Key at: https://dashboard.stripe.com/test/apikeys"
    )
  );
  const STRIPE_SECRET_KEY = await question("Enter your Stripe Secret Key: ");
  console.log(
    chalk.magenta.bold("Now, we'll create a Stripe webhook for you.")
  );
  const STRIPE_WEBHOOK_SECRET = await createStripeWebhook();
  return { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET };
}

async function getResendAPIKey(): Promise<string> {
  console.log(chalk.blue.bold("\nStep 4: Getting Resend API Key"));
  console.log(
    chalk.yellow(
      "You can find your Resend API Key at: https://resend.com/api-keys"
    )
  );
  return await question("Enter your Resend API Key: ");
}

async function getBaseURL(): Promise<string> {
  console.log(chalk.blue.bold("\nStep 5: Setting Base URL"));
  return (
    (await question(
      "Enter your BASE_URL (press Enter for default: 'http://localhost:3000'): "
    )) || "http://localhost:3000"
  );
}

function generateNextAuthSecret(): string {
  console.log(chalk.blue.bold("\nStep 6: Generating NEXTAUTH_SECRET..."));
  return crypto.randomBytes(32).toString("hex");
}

async function getEmailSettings(): Promise<{
  DEV_EMAIL_FROM: string;
  DEV_EMAIL_TO: string;
}> {
  console.log(chalk.blue.bold("\nStep 7: Setting up email settings"));
  const DEV_EMAIL_FROM =
    (await question(
      "Enter the email address to send from (press Enter for default 'Acme <onboarding@resend.dev>'): "
    )) || "Acme <onboarding@resend.dev>";
  const DEV_EMAIL_TO = await question(
    "Enter the email address to send test emails to : "
  );
  return { DEV_EMAIL_FROM, DEV_EMAIL_TO };
}

async function writeEnvFile(envVars: Record<string, string>) {
  console.log(
    chalk.blue.bold("\nStep 8: Writing environment variables to .env")
  );
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  await fs.writeFile(path.join(process.cwd(), ".env"), envContent);
  console.log(chalk.green("✔ .env file created with the necessary variables."));
}

async function main() {
  console.log(chalk.bgBlue.white.bold("\n🚀 Starting setup process...\n"));

  await checkStripeCLI();

  const { DATABASE_URL, DIRECT_URL } = await getDatabaseURLs();
  const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = await getStripeKeys();
  const RESEND_API_KEY = await getResendAPIKey();
  const BASE_URL = await getBaseURL();
  const NEXTAUTH_SECRET = generateNextAuthSecret();
  const { DEV_EMAIL_FROM, DEV_EMAIL_TO } = await getEmailSettings();

  await writeEnvFile({
    DATABASE_URL,
    DIRECT_URL,
    STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET,
    RESEND_API_KEY,
    BASE_URL,
    NEXTAUTH_URL: BASE_URL,
    NEXTAUTH_SECRET,
    DEV_EMAIL_FROM,
    DEV_EMAIL_TO,
  });

  console.log(chalk.green.bold("\n🎉 Setup completed successfully!"));
}

main().catch((error) => {
  console.error(chalk.red.bold("\n❌ An error occurred during setup:"));
  console.error(chalk.red(error));
});
