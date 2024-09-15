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
    <div className="flex flex-col lg:flex-row justify-center max-w-7xl mx-auto px-4 lg:px-8 my-8 lg:my-32">
      <aside className="w-full lg:w-64 lg:mr-8 mb-8 lg:mb-0 lg:fixed lg:left-[max(0px,calc(50%-45rem))] lg:top-28">
        <div className="flex flex-col gap-4 lg:block">
          <SearchBar structure={structure} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden w-full">
                <Menu className="h-4 w-4 mr-2" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
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
        <ScrollArea className="overflow-y-auto max-h-[50vh] lg:max-h-[calc(74vh-6rem)] mt-4 hidden lg:block">
          <nav className="pr-4 py-1">
            {structure.map((category) => (
              <CategoryTree key={category.path} category={category} />
            ))}
          </nav>
        </ScrollArea>
      </aside>
      <main className="w-full lg:w-[calc(100%-16rem)] lg:ml-16">
        {children}
      </main>
    </div>
  );
}
