import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { config } from "@/config";
import ToogleTheme from "@/components/ui/toogle-theme";
import Logo from "@/templates/landing/Logo";
import { cn } from "@/lib/utils";

let menuItems = [
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Pricing",
    href: "/#pricing",
  },
];

if (config.blog.display) {
  menuItems.push({
    title: "Blog",
    href: "/blog",
  });
}

if (config.documentation.display) {
  menuItems.push({
    title: "Documentation",
    href: config.documentation.baseUrl,
  });
}

const DesktopNavigationMenu = ({ isSignIn }: { isSignIn: boolean }) => (
  <NavigationMenu>
    <NavigationMenuList className="flex flex-row items-start">
      {menuItems.map((menuItem, index) => (
        <NavigationMenuItem key={index}>
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
          >
            <Link href={menuItem.href} legacyBehavior passHref>
              {menuItem.title}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

const MobileNavigationMenu = ({ isSignIn }: { isSignIn: boolean }) => (
  <>
    {menuItems.map((menuItem, index) => (
      <SheetClose asChild key={index}>
        <Link
          href={menuItem.href}
          className="block py-2 text-lg hover:text-primary"
          scroll={true}
        >
          {menuItem.title}
        </Link>
      </SheetClose>
    ))}
    <SheetClose asChild>
      <Link
        href={isSignIn ? "/dashboard" : "/sign-in"}
        className="block py-2 text-lg font-medium hover:text-primary"
      >
        {isSignIn ? "Tableau de bord" : "Connexion"}
      </Link>
    </SheetClose>
  </>
);

type Props = {
  isSignIn: boolean;
};

const Navbar = ({ isSignIn }: Props) => {
  return (
    <header className="absolute top-0 left-0 right-0 w-full z-50 md:container flex items-center justify-between py-4">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <div className="hidden md:flex">
            <DesktopNavigationMenu isSignIn={isSignIn} />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="hidden sm:flex px-3"
          >
            <Link href={isSignIn ? "/dashboard" : "/sign-in"}>
              {isSignIn ? "Dashboard" : "Sign in"}
            </Link>
          </Button>
          <ToogleTheme />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <HamburgerMenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-4">
                <MobileNavigationMenu isSignIn={isSignIn} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
