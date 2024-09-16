import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "content/docs");

interface CategoryInfo {
  name: string;
  position: number;
}

export interface DocFile {
  slug: string;
  title: string;
  position?: number;
  path: string;
}

export interface Category {
  name: string;
  position: number;
  files: DocFile[];
  categories?: Category[];
  path: string;
}

/**
 * Retrieves category information from a JSON file.
 * @param categoryPath - Path to the category folder
 * @returns Category information or null if not found
 */
function getCategoryInfo(categoryPath: string): CategoryInfo | null {
  const categoryJsonPath = path.join(categoryPath, "category.json");
  if (fs.existsSync(categoryJsonPath)) {
    const categoryData = JSON.parse(fs.readFileSync(categoryJsonPath, "utf8"));
    return {
      name: categoryData.name,
      position: categoryData.position || 0,
    };
  }
  return null;
}

/**
 * Extracts data from an MDX file.
 * @param filePath - Path to the MDX file
 * @param parentPath - Parent path to construct the full path
 * @returns DocFile object containing file information
 */
function getFileData(filePath: string, parentPath: string[]): DocFile {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  let title = data.title;

  if (!title) {
    const headingMatch = content.match(/^#\s+(.*$)|\n##\s+(.*$)/m);
    title = headingMatch
      ? (headingMatch[1] || headingMatch[2]).trim()
      : "Untitled";
  }

  return {
    slug: path.basename(filePath, ".mdx"),
    title: title,
    position: data.position || 0,
    path: parentPath.join("/"),
  };
}

/**
 * Recursively builds a category structure from a given path.
 * @param categoryPath - Path to the category folder
 * @param parentPath - Parent path array for nested categories
 * @returns Category object with nested files and subcategories
 */
function getCategory(
  categoryPath: string,
  parentPath: string[] = []
): Category {
  const categoryInfo = getCategoryInfo(categoryPath);
  const items = fs.readdirSync(categoryPath);

  const files: DocFile[] = [];
  const categories: Category[] = [];

  const currentPath = [...parentPath];
  const folderName = path.basename(categoryPath);
  if (folderName !== "docs" && !currentPath.includes(folderName)) {
    currentPath.push(folderName);
  }

  items.forEach((item) => {
    const itemPath = path.join(categoryPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      categories.push(getCategory(itemPath, currentPath));
    } else if (item.endsWith(".mdx")) {
      files.push(getFileData(itemPath, currentPath));
    }
  });

  return {
    name: categoryInfo?.name || folderName,
    position: categoryInfo?.position || 0,
    files: files.sort((a, b) => (a.position || 0) - (b.position || 0)),
    categories: categories.sort((a, b) => a.position - b.position),
    path: currentPath.join("/"),
  };
}

/**
 * Generates the entire documentation structure.
 * @returns Array of root categories, including files and nested categories
 */
export function getDocumentationStructure(): Category[] {
  const rootCategories = fs
    .readdirSync(docsDirectory)
    .filter((item) => fs.statSync(path.join(docsDirectory, item)).isDirectory())
    .map((item) => getCategory(path.join(docsDirectory, item), [item]))
    .sort((a, b) => a.position - b.position);

  const rootFiles = fs
    .readdirSync(docsDirectory)
    .filter((item) => item.endsWith(".mdx"))
    .map((item) => getFileData(path.join(docsDirectory, item), []))
    .sort((a, b) => (a.position || 0) - (b.position || 0));

  return [
    {
      name: "",
      position: 0,
      files: rootFiles,
      path: "",
      categories: rootCategories,
    },
  ];
}

/**
 * Retrieves the content of a specific documentation file.
 * @param fullPath - Full path or slug of the documentation file
 * @returns Object containing the file's frontmatter data and content
 * @throws Error if the file is not found
 */
export function getDocumentationContent(fullPath: string) {
  const parts = fullPath.split("/");
  const slug = parts.pop();
  const category = parts.join("/");

  let filePath;
  const possiblePaths = [
    path.join(docsDirectory, `${fullPath}.mdx`),
    path.join(docsDirectory, category, `${slug}.mdx`),
    path.join(docsDirectory, `${category}.mdx`),
  ];

  for (const path of possiblePaths) {
    if (fs.existsSync(path)) {
      filePath = path;
      break;
    }
  }

  if (!filePath) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return { data, content };
}

/**
 * Retrieves all documentation slugs.
 * @returns Array of objects containing category and slug for each document
 */
export function getAllDocumentationSlugs() {
  const structure = getDocumentationStructure();
  return structure.flatMap((category) =>
    category.files.map((file) => ({
      category: category.name,
      slug: file.slug,
    }))
  );
}

/**
 * Finds the previous and next pages for a given slug.
 * @param currentSlug - Slug of the current page
 * @returns Object containing previous and next page information
 */
export function getPreviousAndNextPages(currentSlug: string): {
  previous: PageInfo | null;
  next: PageInfo | null;
} {
  const structure = getDocumentationStructure();
  const flattenedPages = flattenStructure(structure);
  const currentIndex = flattenedPages.findIndex(
    (page) => page.slug === currentSlug
  );

  return {
    previous: currentIndex > 0 ? flattenedPages[currentIndex - 1] : null,
    next:
      currentIndex < flattenedPages.length - 1
        ? flattenedPages[currentIndex + 1]
        : null,
  };
}

/**
 * Flattens the nested category structure into a linear array of pages.
 * @param structure - Array of root categories
 * @returns Flattened array of page information
 */
function flattenStructure(structure: Category[]): PageInfo[] {
  const flattened: PageInfo[] = [];

  function traverse(category: Category, parentPath: string[] = []) {
    category.files.forEach((file) => {
      const slugParts = [...parentPath, file.slug]
        .filter(Boolean)
        .reduce((acc, part) => {
          if (acc[acc.length - 1] !== part) {
            acc.push(part);
          }
          return acc;
        }, [] as string[]);

      flattened.push({
        title: file.title,
        slug: slugParts.join("/"),
      });
    });

    category.categories?.forEach((subCategory) => {
      const newParentPath = [...parentPath, subCategory.path]
        .filter(Boolean)
        .reduce((acc, part) => {
          if (acc[acc.length - 1] !== part) {
            acc.push(part);
          }
          return acc;
        }, [] as string[]);

      traverse(subCategory, newParentPath);
    });
  }

  structure.forEach((category) => traverse(category));
  return flattened;
}

/**
 * Finds the first page in a given category.
 * @param slug - Slug of the category
 * @returns Promise resolving to the slug of the first page or the input slug if not found
 */
export async function getFirstPageInCategory(slug: string): Promise<string> {
  const structure = getDocumentationStructure();
  const findFirstPage = (categories: Category[]): string | null => {
    for (const category of categories) {
      if (category.path === slug) {
        if (category.files.length > 0) {
          return category.files[0].slug;
        }
        if (category.categories && category.categories.length > 0) {
          return findFirstPage(category.categories);
        }
      }
      if (category.categories && category.categories.length > 0) {
        const result = findFirstPage(category.categories);
        if (result) return result;
      }
    }
    return null;
  };

  const firstPage = findFirstPage(structure);
  return firstPage || slug;
}

interface PageInfo {
  title: string;
  slug: string;
}
