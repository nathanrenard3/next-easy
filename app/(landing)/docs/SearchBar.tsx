"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, FileText } from "lucide-react";
import { Category } from "@/lib/docs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface SearchBarProps {
  structure: Category[];
}

interface FlatDocument {
  title: string;
  slug: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ structure }) => {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState<FlatDocument[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const flattenDocuments = (categories: Category[]): FlatDocument[] => {
      return categories.reduce((acc: FlatDocument[], category) => {
        category.files.forEach((file) => {
          acc.push({
            title: file.title,
            slug: `${category.path}/${file.slug}`.replace(/^\//, ""),
          });
        });
        if (category.categories) {
          acc.push(...flattenDocuments(category.categories));
        }
        return acc;
      }, []);
    };

    setDocuments(flattenDocuments(structure));
  }, [structure]);

  const handleSelect = (slug: string) => {
    router.push(`/docs/${slug}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative flex-1 cursor-pointer">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            className="h-9 w-full pl-10 pr-4 rounded-md border bg-background shadow-sm md:w-full"
            placeholder="Search documentation..."
            type="search"
            readOnly
          />
          <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-sm bg-primary/20 p-1 text-xs font-mono font-medium sm:flex">
            <span className="text-primary">⌘K</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[650px] p-0">
        <Command>
          <CommandInput
            placeholder="Search documentation..."
            value={searchInput}
            onValueChange={setSearchInput}
            className="h-14 px-4 text-[15px]"
          />
          <ScrollArea className="max-h-[350px]">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {documents.map((doc) => (
                  <CommandItem
                    key={doc.slug}
                    onSelect={() => handleSelect(doc.slug)}
                    className="px-4 py-2"
                  >
                    <Link
                      href={`/docs/${doc.slug}`}
                      className="flex items-center gap-2 w-full"
                    >
                      <FileText className="h-4 w-4" />
                      <span>{doc.title}</span>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
