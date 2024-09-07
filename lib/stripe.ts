import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "../lib/db/authOptions";
import prisma from "../lib/db/prisma";
import { StripeSubscriptionStatus } from "@prisma/client";

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
    success_url: `${process.env.URL_FRONT}/success`,
    cancel_url: `${process.env.URL_FRONT}/cancel`,
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    allow_promotion_codes: true,
  });

  return checkout.url;
}

/**
 * Check if the company has a subscription
 * @returns {Boolean} - True if the company has a subscription
 */
export async function hasSubscription() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
    include: {
      locations: {
        select: {
          company: true,
        },
      },
    },
  });

  if (!user) {
    return false;
  }

  // Check if the company has a stripe customer id
  if (!user.locations[0].company.stripeCustomerId) {
    return false;
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: String(user.locations[0].company.stripeCustomerId),
  });

  return subscriptions.data.length > 0;
}

/**
 * Check if the company has a Pro subscription
 * @returns {Boolean} - True if the company has a Pro subscription
 */
export async function hasProSubscription() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
    include: {
      locations: {
        select: {
          company: true,
        },
      },
    },
  });

  if (!user) {
    return false;
  }

  // Check if the company has a stripe customer id
  if (!user.locations[0].company.stripeCustomerId) {
    return false;
  }

  const proProduct = await prisma.stripeSubscription.findFirst({
    where: {
      companyId: user.locations[0].company.id,
      stripeStatus: StripeSubscriptionStatus.ACTIVE,
      stripePrice: {
        product: {
          name: "Pro",
        },
      },
    },
  });

  return !!proProduct;
}

/**
 * Check if the user has avanced or pro subscription
 * @returns {Boolean} - True if the company has a Avanced or Pro subscription
 */
export async function hasAdvancedOrProSubscription() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
    include: {
      locations: {
        select: {
          company: true,
        },
      },
    },
  });

  if (!user) {
    return false;
  }

  // Check if the company has a stripe customer id
  if (!user.locations[0].company.stripeCustomerId) {
    return false;
  }

  const avancedProduct = await prisma.stripeSubscription.findFirst({
    where: {
      companyId: user.locations[0].company.id,
      stripeStatus: StripeSubscriptionStatus.ACTIVE,
      stripePrice: {
        product: {
          name: {
            in: ["Pro", "Avancé"],
          },
        },
      },
    },
  });

  return !!avancedProduct;
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
    throw new Error("Vous devez être connecté pour effectuer cette action.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
    include: {
      locations: {
        select: {
          company: true,
        },
      },
    },
  });

  if (!user || !user.locations[0].company.stripeCustomerId) {
    throw new Error("Impossible de trouver les informations de l'entreprise.");
  }

  const checkoutLink = await createCheckoutLink(
    user.locations[0].company.stripeCustomerId,
    priceId
  );

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
