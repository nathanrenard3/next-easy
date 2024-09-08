import DynamicBreadcrumbs from "@/templates/app/DynamicBreadcrumbs";
import Sidebar from "@/templates/app/Sidebar";
import { NavigationElement } from "@/types/navigation-element";
import { Home, Info } from "lucide-react";
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
    {
      title: "Other page",
      icon: <Info className="h-5 w-5" />,
      href: "/dashboard/other",
    },
  ];

  return (
    <div className="flex items-center">
      <Sidebar elements={sidebarElements} />
      <section className="mx-5 my-7 w-full">
        <DynamicBreadcrumbs origin="Dashboard" originPathname="dashboard" />
        <div className="my-5">{children}</div>
      </section>
    </div>
  );
}
