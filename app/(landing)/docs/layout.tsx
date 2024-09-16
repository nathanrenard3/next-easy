import { getDocumentationStructure } from "@/lib/docs";
import SearchBar from "./SearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryTree from "./CategoryTree";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function DocLayout({ children }: { children: React.ReactNode }) {
  const structure = getDocumentationStructure();

  return (
    <div className="flex flex-col xl:flex-row justify-center max-w-7xl mx-auto px-4 xl:px-8 my-8 xl:my-32">
      <aside className="w-full xl:w-64 xl:mr-8 mb-8 xl:mb-0 xl:fixed xl:left-[max(0px,calc(50%-45rem))] xl:top-28">
        <div className="flex flex-col gap-4 xl:block">
          <SearchBar structure={structure} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="xl:hidden w-full">
                <Menu className="h-4 w-4 mr-2" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <ScrollArea className="h-[calc(100vh-4rem)]">
                <nav className="pr-4 pt-4">
                  {structure.map((category) => (
                    <CategoryTree key={category.path} category={category} />
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
        <ScrollArea className="overflow-y-auto max-h-[50vh] xl:max-h-[calc(74vh-6rem)] mt-4 hidden xl:block">
          <nav className="pr-4 py-1">
            {structure.map((category) => (
              <CategoryTree key={category.path} category={category} />
            ))}
          </nav>
        </ScrollArea>
      </aside>
      <main className="w-full xl:w-[calc(100%-16rem)] xl:ml-16">
        {children}
      </main>
    </div>
  );
}
