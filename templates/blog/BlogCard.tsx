import { Post } from "@/types/blog-post";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { config } from "@/config";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { cardMeta } = config.blog;
  const formattedDate = format(new Date(post.date), "d MMMM yyyy", {
    locale: fr,
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-background rounded-xl shadow-md hover:shadow-xl border border-border hover:border-primary overflow-hidden"
    >
      <article className="flex flex-col h-full">
        {cardMeta.image && post.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col justify-between flex-grow p-6">
          <div className="space-y-4">
            {cardMeta.category && (
              <span className="inline-block text-xs font-semibold text-primary bg-foreground/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
            )}
            {cardMeta.title && (
              <h2 className="text-xl font-bold text-primary line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
            )}
            {cardMeta.excerpt && (
              <p className="text-sm text-primary/50 line-clamp-3">
                {post.excerpt}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mt-6 text-sm text-primary/50">
            {cardMeta.date && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formattedDate}
              </div>
            )}
            <span className="flex items-center text-primary font-medium group-hover:underline">
              Read more
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
