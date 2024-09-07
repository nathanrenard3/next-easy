import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/templates/app/Navbar";
import { NavigationElement } from "@/types/navigation-element";
import {
  Home,
  Info,
  Package,
  Users2,
  ShoppingCart,
  Ticket,
  History,
} from "lucide-react";
import { authOptions } from "@/lib/db/authOptions";
import { Metadata } from "next";
import { generateCustomerPortalLink, hasProSubscription } from "@/lib/stripe";
import prisma from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { fetchAllLocations } from "@/lib/db/queries/locations-queries";
import { StripeSubscriptionStatus } from "@prisma/client";
import { fetchSubscriptionsProducts } from "@/lib/db/queries/subscriptions-queries";
import { Pricing } from "@/features/landing/home/Pricing";

export const metadata: Metadata = {
  title: "My Hub - Iconik",
};

const getPrismaUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      locations: {
        select: {
          company: true,
        },
      },
    },
  });
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const companyId = cookies().get("company-id");
  const currentLocationId = cookies().get("current-location");

  if (!session?.user || !currentLocationId || !companyId) {
    redirect("/sign-in");
  }

  const [hasPro, allLocations] = await Promise.all([
    hasProSubscription(),
    fetchAllLocations({
      companyId: companyId!.value,
    }),
  ]);

  const user = session.user;
  const haveSub = await prisma.stripeSubscription.findFirst({
    where: {
      companyId: companyId!.value,
      stripeStatus: StripeSubscriptionStatus.ACTIVE,
      stripePrice: {
        product: {
          name: {
            in: ["Essentiel", "Pro", "Avancé"],
          },
        },
      },
    },
  });

  let pricing:
    | Awaited<ReturnType<typeof fetchSubscriptionsProducts>>
    | undefined;
  if (!haveSub) {
    pricing = await fetchSubscriptionsProducts();
  }

  const sidebarElements: NavigationElement[] = [
    {
      title: "Accueil",
      icon: <Home className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      title: "Information du commerce",
      icon: <Info className="h-5 w-5" />,
      href: "/dashboard/location",
    },
    {
      title: "Categories",
      icon: <Package className="h-5 w-5" />,
      href: "/dashboard/categories",
    },
    {
      title: "Produits",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/dashboard/products",
    },
    {
      title: "Programme de fidélité",
      icon: <Ticket className="h-5 w-5" />,
      href: "/dashboard/loyalty-program",
    },
    {
      title: "Clients",
      icon: <Users2 className="h-5 w-5" />,
      href: "/dashboard/customers",
    },
    {
      title: "Commandes",
      icon: <History className="h-5 w-5" />,
      href: "/dashboard/orders",
    },
  ];

  const currentLocation = allLocations.find(
    (location) => location.id === currentLocationId.value
  );
  const otherLocations = allLocations.filter(
    (location) => location.id !== currentLocationId.value
  );

  return (
    <div className="overflow-x-hidden flex flex-col bg-muted/40 min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar
          firstName={user.firstName}
          lastName={user.lastName}
          elements={sidebarElements}
          currentLocation={currentLocation!}
          locations={otherLocations}
          hasFeature={hasPro}
          superuser={user.superuser}
        />
      </div>
      <div className="mt-20 sm:mt-24 lg:mt-24">
        {haveSub ? (
          children
        ) : pricing ? (
          <Pricing pricing={pricing} isLoggedIn={true} />
        ) : null}
      </div>
    </div>
  );
}
