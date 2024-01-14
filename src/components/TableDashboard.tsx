"use client";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { ButtonEditSales } from "./ButtonEditSales";
import SelectSearch from "./SelectSearch";
import ButtonPaginate from "./ButtonPaginate";

import { ClientsProps, SalesPaginationProps, SalesProps } from "@/Types";

import { Api } from "@/configs/Api";

import { Utils } from "@/utils";

interface TableDashboardProps {
  allClients: ClientsProps[];
}

export const TableDashboard = async ({ allClients }: TableDashboardProps) => {
  const [allSales, setAllSales] = useState<SalesPaginationProps | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const idClient = searchParams.get("id");
  const statusSales = searchParams.get("status");
  const currentPage = searchParams.get("page");

  const getAllSales = async () => {
    try {
      const responseSales = await Api.get(
        `sales/findSalesWithPagination?page=${currentPage ? currentPage : "1"}`
      );

      if (responseSales.status) {
        setAllSales(responseSales.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSalesFiltered = async () => {
    try {
      const responseSalesFiltered = await Api.get(
        `sales/findSales?client_id=${idClient ? idClient : ""}&status_sales=${
          statusSales ? statusSales : ""
        }`
      );

      if (responseSalesFiltered.status) {
        setAllSales(responseSalesFiltered.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clientsFormated = allClients?.map((value) => {
    return {
      value: value.id,
      label: value.username,
    };
  });

  useEffect(() => {
    if (idClient || statusSales) {
      getSalesFiltered();
    } else {
      getAllSales();
    }
  }, [idClient, statusSales]);

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
      <TableContainer>
        <Table variant="simple" size="sm" layout="fixed">
          <Thead>
            <Tr>
              <Th>N° DO PEDIDO</Th>
              <Th>STATUS</Th>
              <Th>CLIENTE</Th>
              <Th isNumeric>AÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allSales?.items.map((value: SalesProps) => {
              return (
                <Tr key={value.id}>
                  <Td>{value.id}</Td>
                  <Td>
                    <Badge
                      colorScheme={Utils.switchColorsStatus(
                        value.status.name.toLocaleUpperCase()
                      )}
                    >
                      {value.status.name}
                    </Badge>
                  </Td>
                  <Td fontWeight="bold">{value.client.username}</Td>
                  <Td isNumeric>
                    <ButtonEditSales dataSales={value} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {allSales && Number(currentPage) < allSales.meta.totalPages && (
        <div className="flex justify-center my-6">
          <ButtonPaginate />
        </div>
      )}
    </div>
  );
};
