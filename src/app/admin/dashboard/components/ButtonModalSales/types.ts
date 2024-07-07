import { ClientSalesProps, SalesProductsProps } from "@/Types";

export interface ModalSalesDetailsProps {
  listProducts: SalesProductsProps[];
  clientDatas: ClientSalesProps;
  nameDelivery: string;
}
