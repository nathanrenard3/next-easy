import {
  Category,
  getDocumentationContent,
  getDocumentationStructure,
  getPreviousAndNextPages,
} from "@/lib/docs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { H1, H2, H3, P, UL, OL, LI, A, CodeBlock } from "@/components/ui/mdx";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const fullPath = params.slug.join("/");
  const { data } = await getDocumentationContent(fullPath);
  return {
    title: `${data.title} - Documentation`,
    description: data.description || "Documentation page",
  };
}

export default async function DocPage({
  params,
}: {
  params: { slug: string[] };
}) {
  try {
    const fullPath = params.slug.join("/");
    const { data, content } = await getDocumentationContent(fullPath);
    const { previous, next } = getPreviousAndNextPages(fullPath);

    const components = {
      h1: H1,
      h2: H2,
      h3: H3,
      p: P,
      ul: UL,
      ol: OL,
      li: LI,
      a: A,
      code: ({ className, ...props }: any) => {
        const isInline = !className;
        return isInline ? (
          <code
            className="px-1 py-0.5 bg-gray-100 rounded text-sm"
            {...props}
          />
        ) : (
          <CodeBlock className={className} {...props} />
        );
      },
    };

    return (
      <article className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-primary">
          {data.title}
        </h1>
        <div className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-none">
          <MDXRemote source={content} components={components} />
        </div>
        <div className="mt-12 flex justify-between items-center">
          {previous && (
            <Link
              href={`/docs/${previous.slug
                .split("/")
                .filter(Boolean)
                .join("/")}`}
              className="flex items-center text-primary hover:underline"
            >
              <ChevronLeft className="mr-2" />
              <span>Previous: {previous.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/docs/${next.slug.split("/").filter(Boolean).join("/")}`}
              className="flex items-center text-primary hover:underline ml-auto"
            >
              <span>Next: {next.title}</span>
              <ChevronRight className="ml-2" />
            </Link>
          )}
        </div>
      </article>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  const structure = getDocumentationStructure();
  const paths: { slug: string[] }[] = [];

  function addPaths(category: Category, currentPath: string[] = []) {
    category.files.forEach((file) => {
      paths.push({ slug: [...currentPath, file.slug] });
    });

    category.categories?.forEach((subCategory) => {
      addPaths(subCategory, [...currentPath, subCategory.path]);
    });
  }

  structure.forEach((category) => addPaths(category));

  return paths;
}
