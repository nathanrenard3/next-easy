import { getDocumentationStructure } from "@/lib/docs";
import Link from "next/link";
import { Category } from "@/lib/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structure = getDocumentationStructure();

  const renderCategory = (category: Category, path: string[] = []) => {
    const titleClass =
      path.length === 0
        ? "text-lg font-bold mb-3"
        : "text-base font-semibold mb-2";

    const currentPath = [
      ...path,
      category.name.toLowerCase().replace(/ /g, "-"),
    ];

    return (
      <div key={category.name || "root"} className="mb-12">
        {category.name && <h3 className={titleClass}>{category.name}</h3>}
        <ul className="space-y-2 ml-4">
          {category.files.map((file) => (
            <li key={file.slug} className="mb-2">
              <Link
                href={`/docs/${[...currentPath.slice(1), file.slug].join("/")}`}
                className="text-sm hover:text-primary transition-colors"
              >
                {file.title}
              </Link>
            </li>
          ))}
          {category.categories &&
            category.categories.map((subCategory) =>
              renderCategory(subCategory, currentPath)
            )}
        </ul>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <aside className="w-64 pr-4">
        <nav className="space-y-4">
          {structure.map((category) => renderCategory(category))}
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
