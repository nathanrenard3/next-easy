import prisma from "@/lib/db/prisma";

export async function fetchAllUsers() {
  return await prisma.user.findMany({
    include: {
      locations: {
        select: {
          address: true,
          city: true,
          postalCode: true,
          company: {
            select: {
              subscriptions: true,
              name: true,
            },
          },
        },
      },
    },
  });
}
