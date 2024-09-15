"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TableOfContents = () => {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"));
    const headingData = elements
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: parseInt(element.tagName[1]),
      }))
      .filter(
        (heading) => heading.id !== "" && heading.text !== "Table of Contents"
      );
    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto">
      <h3 className="text-base font-semibold mb-4 px-3">Table of Contents</h3>
      <ul className="space-y-1.5">
        {headings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            className={cn(
              heading.level === 3 ? "ml-3" : "",
              index > 0 && headings[index - 1].level < heading.level
                ? "mt-2"
                : ""
            )}
          >
            <Link
              href={`#${heading.id}`}
              className={cn(
                "block px-3 py-1.5 rounded-md text-xs transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
                activeId === heading.id &&
                  "bg-primary/10 text-primary font-medium",
                heading.level === 2 ? "font-medium" : ""
              )}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
