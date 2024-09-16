"use client";

import CategoryTree from "./CategoryTree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/lib/docs";
import SearchBar from "./SearchBar";

export default function ClientDocLayout({
  children,
  structure,
}: {
  children: React.ReactNode;
  structure: Category[];
}) {
  return (
    <div className="flex justify-center max-w-7xl mx-auto px-4 lg:px-8">
      <aside className="hidden md:block w-64 mr-8 fixed left-[max(0px,calc(50%-45rem))] top-28">
        <SearchBar structure={structure} />
        <ScrollArea className="overflow-y-auto max-h-[calc(74vh-6rem)] mt-4">
          <nav className="pr-4">
            {structure.map((category) => (
              <CategoryTree key={category.path} category={category} />
            ))}
          </nav>
        </ScrollArea>
      </aside>
      <main className="w-full max-w-3xl">{children}</main>
    </div>
  );
}
