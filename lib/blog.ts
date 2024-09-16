import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/blog-post";

const postsDirectory = path.join(process.cwd(), "content/blog");

/**
 * Retrieves all blog posts from the content directory.
 *
 * @returns {Promise<Post[]>} A promise that resolves to an array of Post objects, sorted by date in descending order.
 */
export async function getAllPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || "",
        content,
        category: data.category || "Non catégorisé",
        image: data.image || "",
      } as Post;
    })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Retrieves a single blog post by its slug.
 *
 * @param {string} slug - The unique identifier for the blog post.
 * @returns {Promise<Post>} A promise that resolves to a Post object containing the post's data.
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt || "",
    content: content,
    category: data.category || "Non catégorisé",
    image: data.image || "",
  };
}
