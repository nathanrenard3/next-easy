import prisma from "@/lib/db/prisma";
import { stripe } from "@/lib/stripe";
import { StripePriceInterval, StripeSubscriptionStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function mapIntervalToEnum(interval: string | null): StripePriceInterval {
  switch (interval?.toLowerCase()) {
    case "day":
      return StripePriceInterval.DAY;
    case "week":
      return StripePriceInterval.WEEK;
    case "month":
      return StripePriceInterval.MONTH;
    case "year":
      return StripePriceInterval.YEAR;
    default:
      return StripePriceInterval.MONTH; // default value
  }
}

function mapSubscriptionStatus(status: string): StripeSubscriptionStatus {
  switch (status) {
    case "active":
      return StripeSubscriptionStatus.ACTIVE;
    case "canceled":
      return StripeSubscriptionStatus.CANCELED;
    case "incomplete":
      return StripeSubscriptionStatus.INCOMPLETE;
    case "incomplete_expired":
      return StripeSubscriptionStatus.INCOMPLETE_EXPIRED;
    case "past_due":
      return StripeSubscriptionStatus.PAST_DUE;
    case "trialing":
      return StripeSubscriptionStatus.TRIALING;
    case "unpaid":
      return StripeSubscriptionStatus.UNPAID;
    default:
      throw new Error(`Unknown subscription status: ${status}`);
  }
}

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export const POST = async (req: NextRequest, res: NextResponse) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("Stripe signature is not set");
    return NextResponse.json(
      { error: "Stripe signature is not set" },
      { status: 400 }
    );
  }

  if (!webhookSecret) {
    console.error("Stripe webhook secret is not set");
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await prisma.stripeProduct.upsert({
            where: {
              productId: (event.data.object as Stripe.Product).id,
            },
            update: {
              name: (event.data.object as Stripe.Product).name,
              description:
                (event.data.object as Stripe.Product).description ?? "",
              active: (event.data.object as Stripe.Product).active,
            },
            create: {
              productId: (event.data.object as Stripe.Product).id,
              description:
                (event.data.object as Stripe.Product).description ?? "",
              name: (event.data.object as Stripe.Product).name,
              active: (event.data.object as Stripe.Product).active,
            },
          });

          break;
        case "product.deleted":
          await prisma.stripeProduct.delete({
            where: {
              productId: (event.data.object as Stripe.Product).id,
            },
          });
          break;
        case "price.updated":
        case "price.created":
          const price = event.data.object as Stripe.Price;
          const productId =
            typeof price.product === "string"
              ? price.product
              : (price.product as Stripe.Product).id;
          const interval = mapIntervalToEnum(price.recurring?.interval ?? null);
          await prisma.stripePrice.upsert({
            where: {
              priceId: price.id,
            },
            update: {
              unitAmount: price.unit_amount ?? 0,
              active: price.active,
              currency: price.currency,
              interval: interval,
            },
            create: {
              priceId: price.id,
              unitAmount: price.unit_amount ?? 0,
              active: price.active,
              currency: price.currency,
              interval: interval,
              product: { connect: { productId: productId } },
            },
          });
          break;
        case "price.deleted":
          await prisma.stripePrice.delete({
            where: {
              priceId: (event.data.object as Stripe.Price).id,
            },
          });
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          const userId = (
            await prisma.user.findFirst({
              where: {
                stripeCustomerId: subscription.customer as string,
              },
              select: { id: true },
            })
          )?.id;
          if (!userId) break;

          const priceId = subscription.items.data[0].price.id;
          const status = mapSubscriptionStatus(subscription.status);
          await prisma.stripeSubscription.upsert({
            where: {
              id: subscription.id,
            },
            update: {
              stripeStatus: status,
              stripePriceId: priceId,
              userId,
              stripeId: subscription.id,
            },
            create: {
              id: subscription.id,
              stripeStatus: status,
              stripePriceId: priceId,
              userId,
              stripeId: subscription.id,
            },
          });
          break;
        }

        case "checkout.session.completed": {
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription as string;
            const customerId = checkoutSession.customer as string;
            const userId = (
              await prisma.user.findFirst({
                where: {
                  stripeCustomerId: customerId,
                },
                select: { id: true },
              })
            )?.id;

            if (!userId) {
              console.error(
                `User not found for Stripe customer ID: ${customerId}`
              );
              break;
            }

            const subscription = await stripe.subscriptions.retrieve(
              subscriptionId
            );

            const priceId = subscription.items.data[0].price.id;
            const status = mapSubscriptionStatus(subscription.status);

            await prisma.stripeSubscription.create({
              data: {
                id: subscription.id,
                stripeStatus: mapSubscriptionStatus(subscription.status),
                stripePriceId: priceId,
                userId,
                stripeId: subscription.id,
              },
            });

            console.log("User session completed and subscription created");
          }
          break;
        }

        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.error(`Webhook handler failed with error: ${error}`);
      return NextResponse.json(
        { error: "Webhook processing failed" },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ received: true });
};
