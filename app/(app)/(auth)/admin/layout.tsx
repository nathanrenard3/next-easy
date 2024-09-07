import { authOptions } from "@/lib/db/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session?.user?.superuser !== true) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-7xl gap-2">
          <h1 className="text-3xl font-semibold">Pannel administrateur</h1>
        </div>
        <div className="mx-auto w-full max-w-7xl flex flex-col items-start">
          <nav className="flex items-start gap-4 text-sm text-muted-foreground mb-4">
            <Link href="/settings" className="font-semibold text-primary">
              Utilisateurs
            </Link>
          </nav>
          <div className="border-t border-muted-foreground mt-2" />{" "}
          <div className="grid mt-4 w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
