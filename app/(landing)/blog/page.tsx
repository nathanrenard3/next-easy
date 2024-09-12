import BlogList from "@/templates/blog/BlogList";
import { getAllPosts } from "@/lib/blog";
import { FadeText } from "@/components/magicui/fade-text";
import { Metadata } from "next";
import { config } from "@/config";

const name = config.name;

export const metadata: Metadata = {
  title: "Blog - " + name,
  description:
    "Discover our latest articles on Next.js development, best practices, and tips for using our boilerplate. Stay informed about the latest trends with NextEasy.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 my-32 lg:my-44">
      <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
        <FadeText
          className="font-bold text-primary uppercase text-base lg:text-lg mb-3"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2 } },
          }}
          text="NextEasy Blog"
        />
        <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 text-primary">
          The latest news and updates from the NextEasy team
        </h1>
        <p className="text-lg text-primary/50 max-w-2xl mx-auto">
          Stay informed about the latest trends in Next.js development, best
          practices for using our boilerplate, and tips to accelerate your
          project development.
        </p>
      </div>

      <BlogList posts={posts} />
    </div>
  );
}
