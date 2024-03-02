"use client";

import { useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { ButtonEditSales } from "./ButtonEditSales";
import SelectSearch from "./SelectSearch";
import ButtonPaginate from "./ButtonPaginate";
import ModalSalesDetails from "./ButtonModalSales";
import { Badge } from "./Badge";

import { ClientsProps, SalesPaginationProps, SalesProps } from "@/Types";

import { Utils } from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TableDashboardProps {
  allClients: ClientsProps[];
  allSales: SalesPaginationProps | undefined;
}

export const TableDashboard = async ({
  allClients,
  allSales,
}: TableDashboardProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = searchParams.get("page");

  const clientsFormated = allClients?.map((value) => {
    return {
      value: value.id,
      label: value.username,
    };
  });

  useEffect(() => {
    if (!currentPage) {
      router.push("dashboard?page=1");
    }
  }, [currentPage]);

  return (
    <div>
      <div className="w-auto m-4">
        <SelectSearch placeholder="Clientes" options={clientsFormated} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° DO PEDIDO</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>CLIENTE</TableHead>
            <TableHead>PREÇO</TableHead>
            <TableHead>FORMA DE ENTREGA</TableHead>
            <TableHead>AÇÕES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allSales?.items.map((value: SalesProps) => {
            return (
              <TableRow key={value.id}>
                <TableCell>{value.id}</TableCell>
                <TableCell>
                  {" "}
                  <Badge
                    color={Utils.switchColorsStatus(
                      value.status.name.toLocaleUpperCase()
                    )}
                  >
                    {value.status.name}
                  </Badge>
                </TableCell>
                <TableCell>{value.client.username}</TableCell>
                <TableCell>
                  {value.total.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>{value.delivery.name}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <ModalSalesDetails
                    listProducts={JSON.parse(value.list_products)}
                    clientDatas={value.client}
                    nameDelivery={value.delivery.name}
                  />
                  <ButtonEditSales dataSales={value} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {allSales && Number(currentPage) < allSales.meta.totalPages && (
        <div className="flex justify-center my-6">
          <ButtonPaginate />
        </div>
      )}
    </div>
  );
};
