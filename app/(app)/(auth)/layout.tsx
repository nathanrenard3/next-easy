import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/templates/app/Navbar";
import { NavigationElement } from "@/types/navigation-element";
import { Home } from "lucide-react";
import { Metadata } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "My Hub - NextEasy",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = session.user;

  const sidebarElements: NavigationElement[] = [
    {
      title: "Home",
      icon: <Home className="h-5 w-5" />,
      href: "/dashboard",
    },
  ];

  return (
    <div className="overflow-x-hidden flex flex-col bg-muted/40 min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar
          firstName={user.firstName}
          lastName={user.lastName}
          elements={sidebarElements}
        />
      </div>
      <div className="mt-20 sm:mt-24 lg:mt-24">{children}</div>
    </div>
  );
}
