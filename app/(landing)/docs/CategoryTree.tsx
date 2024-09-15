"use client";

import Link from "next/link";
import { Category } from "@/lib/docs";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CategoryTree = ({
  category,
  path = [],
}: {
  category: Category;
  path?: string[];
}) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const folderName = category.path.split("/").pop() || "";
  const currentPath = useMemo(() => {
    return [...path, folderName];
  }, [folderName, path]);

  const sortItems = (items: any[]) =>
    [...items].sort((a, b) => {
      if (a.position === undefined && b.position === undefined) return 0;
      if (a.position === undefined) return 1;
      if (b.position === undefined) return -1;
      return a.position - b.position;
    });

  const sortedFiles = sortItems(category.files);
  const sortedCategories = category.categories
    ? sortItems(category.categories)
    : [];

  const isActiveCategory = useMemo(() => {
    return pathname.startsWith(`/docs/${currentPath.slice(1).join("/")}`);
  }, [pathname, currentPath]);

  useEffect(() => {
    if (isActiveCategory) {
      setOpenItems((prev) => Array.from(new Set([...prev, category.path])));
    }
  }, [isActiveCategory, category.path]);

  const CategoryContent = () => (
    <div className="w-full">
      {category.name && (
        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
          className="w-full"
        >
          <AccordionItem value={category.path} className="border-none">
            <AccordionTrigger
              className={cn(
                "px-3 py-2 rounded-md transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
                path.length === 0
                  ? "text-base font-bold"
                  : "text-sm font-semibold",
                isActiveCategory && "text-primary",
                "flex items-center justify-between"
              )}
            >
              {category.name}
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-3">
              <CategoryItems />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      {!category.name && <CategoryItems />}
    </div>
  );

  const CategoryItems = () => (
    <ul className="space-y-1.5 ml-3">
      {sortedFiles.map((file) => {
        const href = `/docs/${[...currentPath.slice(1), file.slug].join("/")}`;
        const isActive = pathname === href;

        return (
          <li key={file.slug} className="relative">
            <Link
              href={href}
              className={cn(
                "block px-2 py-1.5 rounded-md text-xs transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary/10 text-primary font-medium",
                "flex items-center"
              )}
            >
              <FileText className="h-4 w-4 mr-1.5" />
              {file.title}
            </Link>
            {isActive && (
              <div className="absolute left-[-12px] top-1.5 bottom-1.5 w-0.5 bg-primary rounded-full"></div>
            )}
          </li>
        );
      })}
      {sortedCategories.map((subCategory) => (
        <CategoryTree
          key={subCategory.path}
          category={subCategory}
          path={currentPath}
        />
      ))}
    </ul>
  );

  return <CategoryContent />;
};

export default CategoryTree;
