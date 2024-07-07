"use client";

import { useEffect } from "react";

import { ButtonEditSales } from "../ButtonEditSales";
import SelectSearch from "../SelectSearch";
import ModalSalesDetails from "../ButtonModalSales";
import { Pagination } from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";

import { SalesProps } from "@/Types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TableDashboardProps } from "./types";

import { useTableDashboard } from "./useTableDashboard";

export const TableDashboard = ({
  allClients,
  allSales,
}: TableDashboardProps) => {
  const { router, searchParams, clientsFormated, switchColorsStatus } =
    useTableDashboard();

  const currentPage = searchParams.get("page");

  useEffect(() => {
    if (!currentPage) {
      router.push("/admin/dashboard?page=1");
    }
  }, [currentPage]);

  return (
    <div>
      <div className="w-auto m-4">
        <SelectSearch options={clientsFormated(allClients)} />
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
                  <Badge
                    variant={switchColorsStatus(
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
      {allSales && currentPage && (
        <Pagination totalPages={allSales?.meta.totalPages} />
      )}
    </div>
  );
};
