import TableProducts from "@/features/dashboard/products/TableProducts";
import { fetchCategories } from "@/lib/db/queries/categories-queries";
import { fetchProducts } from "@/lib/db/queries/products-queries";
import { Category, Product } from "@prisma/client";
import { cookies } from "next/headers";

const Products = async () => {
  const currentLocation = cookies().get("current-location");

  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    [categories, products] = await Promise.all([
      fetchCategories({
        locationId: currentLocation!.value,
      }),
      fetchProducts({
        locationId: currentLocation!.value,
      }),
    ]);
  } catch (error) {
    console.error("Error fetching products data:", error);
    return <p>Erreur lors de la récupération des produits.</p>;
  }

  return (
    <div>
      <TableProducts products={products} categories={categories} />
    </div>
  );
};

export default Products;
