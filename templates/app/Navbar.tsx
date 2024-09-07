"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NavigationElement } from "@/types/navigation-element";
import { PanelLeft, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Props = {
  elements: NavigationElement[];
  firstName: string;
  lastName: string;
};

const Navbar = ({ firstName, lastName, elements }: Props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="flex items-center justify-between p-4 lg:p-6 shadow-sm bg-white z-50">
      {/* Left side  */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="lg:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="lg:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/dashboard">
              <Image
                className="z-50 w-[80px] md:w-[80px] mb-5"
                src="/logo.svg"
                alt="logo"
                width={80}
                height={20}
                priority
              />
            </Link>
            {elements.map((element, index) => (
              <SheetClose asChild key={index}>
                <Link
                  href={element.href}
                  className={`flex items-center gap-2 rounded-lg p-2 text-sm text-muted-foreground hover:text-accent-foreground ${
                    isActiveLink(element.href)
                      ? "bg-primary/25 text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {element.icon}
                  <span>{element.title}</span>
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <Link className="hidden lg:block" href="/dashboard">
        <Image
          className="z-50 w-[70px] md:w-[90px]"
          src="/logo.svg"
          alt="logo"
          width={90}
          height={20}
          priority
        />
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-3 lg:gap-5">
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <Avatar>
                <AvatarFallback className="bg-primary text-muted">
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 ml-1" />
              </motion.div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align={isMobile ? "end" : "center"}
          >
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => signOut()}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
