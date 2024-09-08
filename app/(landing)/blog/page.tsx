import BlogList from "@/templates/blog/BlogList";
import { getAllPosts } from "@/lib/blog";
import { FadeText } from "@/components/magicui/fade-text";
import { Metadata } from "next";
import { config } from "@/config";
export const metadata: Metadata = {
  title: "Blog - NextEasy",
  description:
    "Discover our latest articles on Next.js development, best practices, and tips for using our boilerplate. Stay informed about the latest trends with NextEasy.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
        <FadeText
          className="font-bold text-primary uppercase text-base lg:text-lg mb-3"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text={config.blog.title}
        />
        <h1 className="text-3xl lg:text-5xl font-extrabold mb-4">
          {config.blog.subtitle}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {config.blog.description}
        </p>
      </div>

      <BlogList posts={posts} />
    </div>
  );
}
