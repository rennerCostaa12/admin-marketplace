export const revalidate = 60;

import { cookies } from "next/headers";
import { TableDashboard } from "@/components/TableDashboard";
import ButtonUpdate from "@/components/ButtonUpdate";

import { Api } from "@/configs/Api";

import { ClientsProps, SalesPaginationProps } from "@/Types";

async function AllClientsDatas() {
  try {
    const response = await Api.get("clients/listClients");

    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function AllSalesData(page: string = "1") {
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
}

async function getSalesFiltered(
  idClient: string | undefined,
  statusSales: string | undefined
) {
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
}

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
  const allSales: SalesPaginationProps = await AllSalesData(searchParams.page);
  const salesFiltered: SalesPaginationProps = await getSalesFiltered(
    searchParams.id,
    searchParams.status
  );

  return (
    <main>
      <div className="m-4">
        <div className="w-auto mx-4 my-6 flex justify-end flex-end">
          <ButtonUpdate />
        </div>
        <TableDashboard
          allClients={allClients}
          allSales={salesFiltered ? salesFiltered : allSales}
        />
      </div>
    </main>
  );
}
