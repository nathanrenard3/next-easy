import {
  getDocumentationContent,
  getPreviousAndNextPages,
  getFirstPageInCategory,
} from "@/lib/docs";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { H1, H2, H3, P, UL, OL, LI, A, CodeBlock } from "@/components/ui/mdx";
import TableOfContents from "./TableOfContents";

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
            className="px-1 py-0.5 bg-primary/10 text-primary rounded text-sm"
            {...props}
          />
        ) : (
          <CodeBlock className={className} {...props} />
        );
      },
    };

    const getLinkHref = async (item: { slug: string; title: string }) => {
      const firstPage = await getFirstPageInCategory(item.slug);
      return `/docs/${firstPage || item.slug}`;
    };

    return (
      <div className="flex justify-center max-w-7xl mx-auto px-4 xl:px-8 mb-16">
        <main className="w-full max-w-3xl">
          <article>
            <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold mb-2 text-primary">
              {data.title}
            </h1>
            {data.description && (
              <blockquote className="border-l-2 border-primary pl-3 py-1 mb-6">
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground italic">
                  {data.description}
                </p>
              </blockquote>
            )}
            <div className="prose prose-sm sm:prose md:prose-lg xl:prose-xl max-w-none">
              <MDXRemote source={content} components={components} />
            </div>
            <div className="mt-12 flex justify-between items-center">
              {previous && (
                <Link
                  href={await getLinkHref(previous)}
                  className="flex items-center text-primary hover:underline"
                >
                  <ChevronLeft className="mr-2" />
                  <span>Previous: {previous.title}</span>
                </Link>
              )}
              {next && (
                <Link
                  href={await getLinkHref(next)}
                  className="flex items-center text-primary hover:underline ml-auto"
                >
                  <span>Next: {next.title}</span>
                  <ChevronRight className="ml-2" />
                </Link>
              )}
            </div>
          </article>
        </main>
        <aside className="hidden xl:block w-64 ml-8 fixed right-[max(0px,calc(50%-45rem))] top-28">
          <div className="overflow-y-auto max-h-[calc(100vh-6rem)]">
            <TableOfContents />
          </div>
        </aside>
      </div>
    );
  } catch (error) {
    console.error("Error in DocPage:", error);
    return <div>Error loading documentation</div>;
  }
}
