"use client";

import { Post } from "@/types/blog-post";
import BlogCard from "./BlogCard";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const categorySet = new Set(posts.map((post) => post.category));
    return ["all", ...Array.from(categorySet)];
  }, [posts]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || post.category === selectedCategory)
  );

  return (
    <div>
      <div className="mb-16 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            {searchTerm || selectedCategory !== "all"
              ? "No articles match your search criteria."
              : "There are no articles yet, but they're coming soon!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
