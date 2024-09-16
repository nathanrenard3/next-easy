"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationElement } from "@/types/navigation-element";

interface SidebarProps {
  elements: NavigationElement[];
}

const Sidebar = ({ elements }: SidebarProps) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth >= 1024) {
      // lg breakpoint
      document.body.style.paddingLeft = isExpanded ? "16rem" : "4rem";
    } else {
      document.body.style.paddingLeft = "0";
    }
    return () => {
      document.body.style.paddingLeft = "0";
    };
  }, [isExpanded, windowWidth]);

  if (windowWidth < 1024) return null; // Don't render sidebar on smaller screens

  const isActiveLink = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      initial={{ width: "4rem" }}
      animate={{ width: isExpanded ? "16rem" : "4rem" }}
      transition={{ duration: 0.3 }}
      className="fixed inset-y-0 top-20 left-0 z-10 flex flex-col border-r bg-background"
    >
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        {isExpanded ? (
          <div className="flex w-full justify-end mb-4">
            <button
              onClick={toggleSidebar}
              className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors hover:bg-background/25"
            >
              <ChevronLeft />
            </button>
          </div>
        ) : (
          <button
            onClick={toggleSidebar}
            className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors hover:bg-background/25 mb-4"
          >
            <ChevronRight />
          </button>
        )}
        {elements.map((element, index) => (
          <Link
            key={index}
            href={element.href}
            className={`flex h-12 w-full items-center justify-start rounded-lg transition-colors hover:text-foreground px-3 ${
              isActiveLink(element.href)
                ? "bg-primary/25 text-accent-foreground"
                : "text-muted-foreground"
            }`}
          >
            {element.icon}
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="ml-3 text-sm whitespace-nowrap overflow-hidden"
                  style={{ maxWidth: isExpanded ? "100%" : "0" }}
                >
                  {element.title}
                </motion.span>
              )}
            </AnimatePresence>
            {!isExpanded && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="sr-only">{element.title}</span>
                </TooltipTrigger>
                <TooltipContent side="right">{element.title}</TooltipContent>
              </Tooltip>
            )}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
