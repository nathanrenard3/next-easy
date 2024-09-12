"use client";

import Link from "next/link";
import { Category } from "@/lib/docs";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const CategoryTree = ({
  category,
  path = [],
}: {
  category: Category;
  path?: string[];
}) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const titleClass =
    path.length === 0
      ? "text-lg font-bold mb-3"
      : "text-base font-semibold mb-2";

  const folderName = category.path.split("/").pop() || "";
  const currentPath = [...path, folderName];

  // Sort files by position, placing those without position at the end
  const sortedFiles = [...category.files].sort((a, b) => {
    if (a.position === undefined && b.position === undefined) return 0;
    if (a.position === undefined) return 1;
    if (b.position === undefined) return -1;
    return a.position - b.position;
  });

  // Sort categories by position, placing those without position at the end
  const sortedCategories = category.categories
    ? [...category.categories].sort((a, b) => {
        if (a.position === undefined && b.position === undefined) return 0;
        if (a.position === undefined) return 1;
        if (b.position === undefined) return -1;
        return a.position - b.position;
      })
    : [];

  const CategoryContent = () => (
    <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
      {category.name && <h3 className={titleClass}>{category.name}</h3>}
      <ul className="space-y-2 ml-4">
        {sortedFiles.map((file) => {
          const href = `/docs/${[...currentPath.slice(1), file.slug].join(
            "/"
          )}`;
          const isActive = pathname === href;
          return (
            <li key={file.slug} className="mb-2 relative">
              <Link
                href={href}
                className={`text-sm hover:text-primary transition-colors ${
                  isActive ? "text-primary font-medium" : ""
                }`}
              >
                {file.title}
              </Link>
              {isActive && (
                <div className="absolute left-[-16px] top-0 bottom-0 w-0.5 bg-primary"></div>
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
    </ScrollArea>
  );

  if (isMobile && path.length === 0) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mb-4 md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <CategoryContent />
        </SheetContent>
      </Sheet>
    );
  }

  return <CategoryContent />;
};

export default CategoryTree;
