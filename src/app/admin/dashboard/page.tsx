import { User, Banknote, ShoppingBasket } from "lucide-react";
import { cookies } from "next/headers";
import { Metadata } from "next";

import { CardInformations } from "@/app/admin/dashboard/components/CardInformations";
import { TableDashboard } from "@/app/admin/dashboard/components/TableDashboard";
import { Api } from "@/configs/Api";
import { Masks } from "@/utils/masks";
import {
  ClientsProps,
  SalesPaginationProps,
  ProductsPaginationProps,
} from "@/Types";

import { DashboardProps } from "./types";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard do marketplace",
};

const { setMoneyNumber } = Masks;

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

const SalesFiltered = async (
  id: string | undefined,
  status: string | undefined,
  page: string | undefined
) => {
  try {
    if ((id && id.length > 0) || (status && status.length > 0)) {
      const responseSalesFiltered = await Api.get(
        `sales/findSales?client_id=${id}&status_sales=${status}&page=${page}`
      );

      if (responseSalesFiltered.status) {
        return responseSalesFiltered.data;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const allProducts = async () => {
  try {
    const responseAllProducts = await Api.get("products?page=1");

    if (responseAllProducts.status) {
      return responseAllProducts.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export default async function Dashboard({ searchParams }: DashboardProps) {
  const cookiesStore = cookies();

  Api.defaults.headers.common.Authorization = `Bearer ${
    cookiesStore.get("@Marketplace:admin_token_user")?.value
  }`;

  const allClients: ClientsProps[] = await AllClientsDatas();
  const salesFiltered: SalesPaginationProps = await SalesFiltered(
    searchParams.id,
    searchParams.status,
    searchParams.page
  );
  const allSales: SalesPaginationProps = await AllSalesData(searchParams.page);
  const quantityProducts: ProductsPaginationProps = await allProducts();

  return (
    <main>
      <div className="m-4">
        <div className="flex justify-center gap-10 mb-10 max-lg:flex-col max-lg:gap-5">
          <CardInformations
            icon={<User className="w-10 h-10 text-primary" />}
            quantity={allClients.length}
            title="Clientes"
          />
          <CardInformations
            icon={<ShoppingBasket className="w-10 h-10 text-primary" />}
            quantity={quantityProducts.meta.totalItems}
            title="Produtos Cadastrados"
          />
          <CardInformations
            icon={<Banknote className="w-10 h-10 text-primary" />}
            quantity={setMoneyNumber(400)}
            title="Total Hoje"
          />
        </div>
        <TableDashboard
          allClients={allClients}
          allSales={salesFiltered ? salesFiltered : allSales}
        />
      </div>
    </main>
  );
}
