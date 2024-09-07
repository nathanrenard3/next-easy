import prisma from "@/lib/db/prisma";
import { generateCustomerPortalLink } from "@/lib/stripe";
import { cookies } from "next/headers";
import Link from "next/link";

const getCompany = async (companyId: string) => {
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });
  return company;
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companyId = cookies().get("company-id");
  const company = await getCompany(companyId!.value || "");

  const manageSubscription = await generateCustomerPortalLink(
    "" + company!.stripeCustomerId
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-7xl gap-2">
          <h1 className="text-3xl font-semibold">Paramètres</h1>
        </div>
        <div className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="/settings" className="font-semibold text-primary">
              Général
            </Link>
            <Link href={"" + manageSubscription}>Gestion de l'abonnement</Link>
          </nav>
          <div className="grid gap-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
