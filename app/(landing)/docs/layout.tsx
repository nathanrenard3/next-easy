import { getDocumentationStructure } from "@/lib/docs";
import CategoryTree from "./CategoryThree";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structure = getDocumentationStructure();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:my-32">
      <aside className="w-64 pr-4 md:fixed md:top-32 md:left-1/6 md:bottom-0 md:overflow-hidden">
        <nav className="space-y-4">
          {structure.map((category) => (
            <CategoryTree key={category.path} category={category} />
          ))}
        </nav>
      </aside>
      <main className="flex-1 md:ml-64">{children}</main>
    </div>
  );
}
