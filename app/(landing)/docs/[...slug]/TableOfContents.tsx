"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TableOfContents = () => {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

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
  }, []);

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto">
      <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            className={`${heading.level === 3 ? "ml-4" : ""} ${
              index > 0 && headings[index - 1].level < heading.level
                ? "mt-2"
                : ""
            }`}
          >
            <Link
              href={`#${heading.id}`}
              className={`text-sm hover:text-primary ${
                heading.level === 2 ? "font-medium" : ""
              }`}
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
