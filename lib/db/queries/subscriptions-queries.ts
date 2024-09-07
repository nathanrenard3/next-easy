import prisma from "../prisma";
import { StripePriceInterval } from "@prisma/client";

export async function fetchSubscriptionsProducts() {
  const products = await prisma.stripeProduct.findMany({
    include: {
      prices: true,
      features: true,
    },
  });

  // Sort products by the smallest monthly and yearly price
  products.sort((a, b) => {
    const minPriceA = Math.min(
      ...a.prices
        .filter(
          (price) =>
            price.interval === StripePriceInterval.MONTH ||
            price.interval === StripePriceInterval.YEAR
        )
        .map((price) => price.unitAmount || Infinity)
    );
    const minPriceB = Math.min(
      ...b.prices
        .filter(
          (price) =>
            price.interval === StripePriceInterval.MONTH ||
            price.interval === StripePriceInterval.YEAR
        )
        .map((price) => price.unitAmount || Infinity)
    );
    return minPriceA - minPriceB;
  });

  return products;
}
