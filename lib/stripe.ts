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
 * Create a checkout link for stripe subscription
 * @param {String} customerId - The customer id
 * @param {String} priceId - The price id
 * @returns
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

export async function generateCustomerPortalLink(customerId: string) {
  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: process.env.URL_FRONT + "/dashboard",
  });

  return portal.url;
}

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
