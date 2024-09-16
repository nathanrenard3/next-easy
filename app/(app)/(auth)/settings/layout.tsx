import Link from "next/link";
import { Metadata } from "next";
import { config } from "@/config";

export const metadata: Metadata = {
  title: `${config.name} - Settings`,
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen h-full w-full flex-col ">
      <main className="flex h-full flex-col gap-4 p-5 py-12 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-7xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="/settings" className="font-semibold text-primary">
              General
            </Link>
          </nav>
          <div className="grid gap-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
