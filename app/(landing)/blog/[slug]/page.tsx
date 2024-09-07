import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Post } from "@/types/blog-post";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Metadata } from "next";
import {
  H1,
  H2,
  H3,
  P,
  UL,
  OL,
  LI,
  A,
} from "@/features/landing/blog/MdxComponents";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post: Post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post: Post = await getPostBySlug(params.slug);
  const formattedDate = format(new Date(post.date), "d MMMM yyyy", {
    locale: fr,
  });

  const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    ul: UL,
    ol: OL,
    li: LI,
    a: A,
  };

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/blog">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Retour aux articles
            </Link>
          </Button>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-primary">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center text-gray-600 mb-6">
          <span className="mr-4 text-sm sm:text-base">{formattedDate}</span>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm">
            {post.category}
          </span>
        </div>
        <hr className="border-t border-gray-300 mb-8" />
        <div className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-none">
          <MDXRemote source={post.content} components={components} />
        </div>
      </div>
    </article>
  );
}
