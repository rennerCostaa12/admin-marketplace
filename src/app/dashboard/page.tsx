export const revalidate = 60;

import { cookies } from "next/headers";
import { Tabs } from "./components/Tabs";

import { Api } from "@/configs/Api";

import {
  ClientsProps,
  ProductsPaginationProps,
  SalesPaginationProps,
} from "@/Types";

const AllClientsDatas = async () => {
  try {
    const response = await Api.get("clients/listClients");

    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const AllSalesData = async (page: string = "1") => {
  try {
    const responseSales = await Api.get(
      `sales/findSalesWithPagination?page=${page}`
    );

    if (responseSales.status) {
      return responseSales.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getSalesFiltered = async (
  idClient: string | undefined,
  statusSales: string | undefined
) => {
  if (!idClient && !statusSales) {
    return;
  }
  try {
    const responseSalesFiltered = await Api.get(
      `sales/findSales?client_id=${idClient ? idClient : ""}&status_sales=${
        statusSales ? statusSales : ""
      }`
    );

    if (responseSalesFiltered.status) {
      return responseSalesFiltered.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getProducts = async (page: string = "1") => {
  try {
    const responseProducts = await Api.get(`products?page=${page}`);

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

interface DashboardProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const cookiesStore = cookies();

  Api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@Marketplace:admin_token_user")?.value
  }`;

  const allClients: ClientsProps[] = await AllClientsDatas();
  const allProducts: ProductsPaginationProps = await getProducts(
    searchParams.page
  );
  const productsFiltered: ProductsPaginationProps = await getProductsFiltered(
    searchParams.productName
  );
  const allSales: SalesPaginationProps = await AllSalesData(searchParams.page);
  const salesFiltered: SalesPaginationProps = await getSalesFiltered(
    searchParams.id,
    searchParams.status
  );

  return (
    <main>
      <div className="m-4">
        <Tabs
          allClients={allClients}
          allSales={salesFiltered ? salesFiltered : allSales}
          allProducts={productsFiltered ? productsFiltered : allProducts}
        />
      </div>
    </main>
  );
}
