"use client";

import {
  Tabs as TabsUi,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { TableDashboard } from "./TableDashboard";
import { FormRegisterProduct } from "./FormRegisterProduct";
import { ListProducts } from "./ListProducts";
import ButtonUpdate from "./ButtonUpdate";

import {
  ClientsProps,
  ProductsPaginationProps,
  SalesPaginationProps,
} from "@/Types";
import { Container } from "@/components/Container";
import { usePathname, useRouter } from "next/navigation";

interface TabsProps {
  allClients: ClientsProps[];
  allSales: SalesPaginationProps | undefined;
  allProducts: ProductsPaginationProps;
}

export const Tabs = ({ allClients, allSales, allProducts }: TabsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const resetUrl = () => {
    router.push(`${pathname}`);
  };

  return (
    <Container>
      <TabsUi defaultValue="sales">
        <TabsList>
          <TabsTrigger onClick={resetUrl} value="sales">
            Listagem de Vendas
          </TabsTrigger>
          <TabsTrigger onClick={resetUrl} value="register-products">
            Cadastrar Produtos
          </TabsTrigger>
          <TabsTrigger onClick={resetUrl} value="list-products">
            Listagem de Produtos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sales">
          <div>
            <div className="w-auto mx-4 my-6 flex justify-end flex-end">
              <ButtonUpdate />
            </div>
            <TableDashboard allClients={allClients} allSales={allSales} />
          </div>
        </TabsContent>
        <TabsContent value="register-products">
          <FormRegisterProduct />
        </TabsContent>
        <TabsContent value="list-products">
          <ListProducts products={allProducts} />
        </TabsContent>
      </TabsUi>
    </Container>
  );
};
