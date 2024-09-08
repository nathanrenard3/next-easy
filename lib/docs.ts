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

function getFileData(filePath: string, parentPath: string[]): DocFile {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);
  return {
    slug: path.basename(filePath, ".mdx"),
    title: data.title || "Untitled",
    position: data.position || 0,
    path: parentPath.join("/"),
  };
}

function getCategory(
  categoryPath: string,
  parentPath: string[] = []
): Category {
  const categoryInfo = getCategoryInfo(categoryPath);
  const items = fs.readdirSync(categoryPath);

  const files: DocFile[] = [];
  const categories: Category[] = [];

  const currentPath = [...parentPath, path.basename(categoryPath)];

  items.forEach((item) => {
    const itemPath = path.join(categoryPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      categories.push(getCategory(itemPath, currentPath));
    } else if (item.endsWith(".mdx")) {
      files.push(getFileData(itemPath, currentPath));
    }
  });

  return {
    name: categoryInfo?.name || path.basename(categoryPath),
    position: categoryInfo?.position || 0,
    files: files.sort((a, b) => (a.position || 0) - (b.position || 0)),
    categories: categories.sort((a, b) => a.position - b.position),
    path: currentPath.join("/"),
  };
}

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

export function getAllDocumentationSlugs() {
  const structure = getDocumentationStructure();
  return structure.flatMap((category) =>
    category.files.map((file) => ({
      category: category.name,
      slug: file.slug,
    }))
  );
}
