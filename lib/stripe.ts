import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "./prisma";
import { config } from "@/config";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

export const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

/**
 * Creates a Stripe checkout link for a subscription or a payment.
 * @param {string} customerId - The Stripe customer ID.
 * @param {string} priceId - The Stripe price ID for the payment or subscription.
 * @returns {Promise<string|null>} The checkout URL or null if creation fails.
 */
export async function createCheckoutLink(customerId: string, priceId: string) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: config.stripe.payment_success_url,
    cancel_url: config.stripe.payment_cancel_url,
    mode: config.stripe.mode as Stripe.Checkout.SessionCreateParams.Mode,
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: config.stripe.allow_promotion_codes,
  });

  return checkout.url;
}

/**
 * Creates a Stripe customer portal session for managing subscriptions.
 * @param {string} customerId - The Stripe customer ID.
 * @returns {Promise<string>} The customer portal URL.
 */
export async function generateCustomerPortalLink(customerId: string) {
  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: process.env.BASE_URL + "/dashboard",
  });

  return portal.url;
}

/**
 * Creates a Stripe checkout session for the authenticated user.
 * @param {string} priceId - The Stripe price ID for the subscription.
 * @returns {Promise<string|null>} The checkout URL or null if creation fails.
 * @throws {Error} If the user is not logged in or doesn't have a Stripe customer ID.
 */
export const createCheckoutSession = async (priceId: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("You are not logged in.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  if (!user || !user.stripeCustomerId) {
    throw new Error("The user does not have a stripe customer id.");
  }

  const checkoutLink = await createCheckoutLink(user.stripeCustomerId, priceId);

  return checkoutLink;
};

/**
 * Fetches all Stripe products with their associated prices and features.
 * @returns {Promise<Array<{
 *   productId: string,
 *   name: string,
 *   description: string | null,
 *   active: boolean,
 *   prices: Array<{
 *     priceId: string,
 *     currency: string,
 *     active: boolean,
 *     unitAmount: number | null,
 *     interval: string | null
 *   }>,
 *   features: Array<string>
 * }>>} An array of Stripe products with detailed information.
 */
export async function fetchStripeProducts() {
  const products = await stripe.products.list();
  const stripeProducts = [];

  for (const product of products.data) {
    const prices = await stripe.prices.list({
      product: product.id,
    });

    const priceData = prices.data.map((price) => ({
      priceId: price.id,
      currency: price.currency,
      active: price.active,
      unitAmount: price.unit_amount,
      interval: price.recurring?.interval || null,
    }));

    const features = product.metadata.features
      ? JSON.parse(product.metadata.features)
      : [];

    stripeProducts.push({
      productId: product.id,
      name: product.name,
      description: product.description,
      active: product.active,
      prices: priceData,
      features: features,
    });
  }

  return stripeProducts;
}
