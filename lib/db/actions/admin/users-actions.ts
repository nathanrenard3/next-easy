"use server";

import prisma from "@/lib/db/prisma";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

const ERROR_MESSAGES = {
  USER_NOT_FOUND: "User not found",
  COMPANY_NOT_FOUND: "Company not found for the user",
  STRIPE_ID_MISSING: "Stripe customer ID is missing",
  DELETE_FAILED: "Failed to delete user",
};

const deleteSubscriptions = async (companyId: string) => {
  await prisma.stripeSubscription.deleteMany({ where: { companyId } });
};

const deleteStripeCustomer = async (stripeCustomerId: string) => {
  await stripe.customers.del(stripeCustomerId);
};

const deleteCompanyData = async (companyId: string) => {
  await prisma.pointCondition.deleteMany({
    where: { loyaltyProgram: { location: { companyId } } },
  });
  await prisma.reward.deleteMany({
    where: { loyaltyProgram: { location: { companyId } } },
  });
  await prisma.product.deleteMany({
    where: { category: { location: { companyId } } },
  });
  await prisma.category.deleteMany({ where: { location: { companyId } } });
  await prisma.loyaltyProgram.deleteMany({
    where: { location: { companyId } },
  });
  await prisma.openingHours.deleteMany({ where: { location: { companyId } } });
  await prisma.location.deleteMany({ where: { companyId } });
};

export const deleteUserAction = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      locations: {
        select: {
          company: {
            select: {
              id: true,
              stripeCustomerId: true,
            },
          },
        },
      },
    },
  });

  if (!user) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);

  const company = user.locations[0]?.company;
  if (!company) throw new Error(ERROR_MESSAGES.COMPANY_NOT_FOUND);

  const { stripeCustomerId } = company;
  if (!stripeCustomerId) throw new Error(ERROR_MESSAGES.STRIPE_ID_MISSING);

  await prisma.$transaction(async (prisma) => {
    try {
      await deleteSubscriptions(company.id);
      await deleteStripeCustomer(stripeCustomerId);
      await deleteCompanyData(company.id);
      await prisma.company.delete({ where: { id: company.id } });
      await revalidatePath("/admin");
    } catch (error) {
      throw new Error(`${ERROR_MESSAGES.DELETE_FAILED}: ${error}`);
    }
  });
};
