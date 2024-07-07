import { Api } from "@/configs/Api";
import { ListProducts } from "./components/ListProducts";
import { ProductsPaginationProps } from "@/Types";
import { Container } from "@/components/Container";
import { cookies } from "next/headers";
import { ProductsProps } from "./types";

const getProducts = async (page: string = "1") => {
  try {
    const responseProducts = await Api.get(`products?page=${page}&limit=15`);

    if (responseProducts.status) {
      return responseProducts.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getProductsFiltered = async (nameProduct: string | undefined) => {
  if (!nameProduct) {
    return;
  }

  try {
    const responseProducts = await Api.get(
      `products/searchProducts/${nameProduct}`
    );

    if (responseProducts.status) {
      return responseProducts.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export default async function Products({ searchParams }: ProductsProps) {
  const cookiesStore = cookies();

  Api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@Marketplace:admin_token_user")?.value
  }`;

  const allProducts: ProductsPaginationProps = await getProducts(
    searchParams.page
  );
  const productsFiltered: ProductsPaginationProps = await getProductsFiltered(
    searchParams.productName
  );

  return (
    <main className="py-4">
      <Container>
        <ListProducts
          products={productsFiltered ? productsFiltered : allProducts}
        />
      </Container>
    </main>
  );
}

