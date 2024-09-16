import Sidebar from "@/templates/app/Sidebar";
import { NavigationElement } from "@/types/navigation-element";
import { Home } from "lucide-react";
import { Metadata } from "next";
import { config } from "@/config";

export const metadata: Metadata = {
  title: `${config.name} - Dashboard`,
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarElements: NavigationElement[] = [
    {
      title: "Home",
      icon: <Home className="h-5 w-5" />,
      href: "/dashboard",
    },
  ];

  return (
    <div className="flex items-center">
      <Sidebar elements={sidebarElements} />
      <section className="mx-5 my-7 w-full">
        <div className="my-5">{children}</div>
      </section>
    </div>
  );
}
