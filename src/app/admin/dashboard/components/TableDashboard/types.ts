import { ClientsProps, SalesPaginationProps } from "@/Types";

export interface TableDashboardProps {
  allClients: ClientsProps[];
  allSales: SalesPaginationProps | undefined;
}
