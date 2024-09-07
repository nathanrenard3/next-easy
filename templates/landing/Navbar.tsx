import Image from "next/image";
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

const menuItems = [
  {
    title: "Features",
    href: "/#features",
    items: undefined,
  },
  {
    title: "Pricing",
    href: "/#pricing",
    items: undefined,
  },
  {
    title: "Blog",
    href: "/blog",
    items: undefined,
  },
];

const DesktopNavigationMenu = ({ isSignIn }: { isSignIn: boolean }) => (
  <NavigationMenu>
    <NavigationMenuList className="flex flex-row items-start">
      {menuItems.map((menuItem, index) => (
        <NavigationMenuItem key={index}>
          <Link href={menuItem.href} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {menuItem.title}
            </NavigationMenuLink>
          </Link>
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
    <header className="container flex items-center justify-between py-4">
      <div className="flex items-center">
        <Link href="/">
          <Image
            className="z-50 w-[100px] md:w-[140px]"
            src="/logo.svg"
            alt="logo"
            width={120}
            height={20}
            priority
          />
        </Link>
        <div className="hidden md:block ml-5 p-3">
          <DesktopNavigationMenu isSignIn={isSignIn} />
        </div>
      </div>

      <div className="flex items-center">
        <Button asChild variant="default" size="lg" className="hidden md:flex">
          <Link
            href={isSignIn ? "/dashboard" : "/sign-in"}
            className="mr-3 lg:mr-0"
          >
            {isSignIn ? "Dashboard" : "Sign in"}
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <HamburgerMenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="p-4">
              <MobileNavigationMenu isSignIn={isSignIn} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
