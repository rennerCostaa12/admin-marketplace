import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pagination } from "@/components/Pagination";
import { ButtonEditProducts } from "./ButtonEditProducts";
import { SearchProduct } from "./SearchProduct";

import { ProductsPaginationProps } from "@/Types";

interface ListProductsProps {
  products: ProductsPaginationProps;
}

export const ListProducts = ({ products }: ListProductsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("page");
  const isProductFiltered = searchParams.get("productName");

  useEffect(() => {
    if (!currentPage && !isProductFiltered) {
      router.push("dashboard?page=1");
    }
  }, [currentPage]);

  return (
    <div className="w-full">
      <SearchProduct />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CÓDIGO</TableHead>
            <TableHead>NOME</TableHead>
            <TableHead>PREÇO</TableHead>
            <TableHead>ESTOQUE</TableHead>
            <TableHead>IMAGEM DO PRODUTO</TableHead>
            <TableHead>DISPONÍVEL</TableHead>
            <TableHead>AÇÕES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.items.map((value) => {
            return (
              <TableRow key={value.id}>
                <TableCell>{value.id}</TableCell>
                <TableCell>{value.name.toLocaleUpperCase()}</TableCell>
                <TableCell>
                  {value.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>{value.stock}</TableCell>
                <TableCell>
                  <img
                    className="w-20"
                    src={value.img_product}
                    alt={`imagem-${value.name}`}
                  />
                </TableCell>
                <TableCell>{value.unavailable ? "Não" : "Sim"}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <ButtonEditProducts dataProduct={value} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {currentPage && (
        <div>
          <Pagination totalPages={products.meta.totalPages} />
        </div>
      )}
    </div>
  );
};
