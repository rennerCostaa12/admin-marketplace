"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { SalesProductsProps, ClientSalesProps } from "@/Types";
import { KanbanSquare } from "lucide-react";

interface ModalSalesDetailsProps {
  listProducts: SalesProductsProps[];
  clientDatas: ClientSalesProps;
  nameDelivery: string;
}

export default function ModalSalesDetails({
  listProducts,
  clientDatas,
  nameDelivery,
}: ModalSalesDetailsProps) {
  const totalPrice = listProducts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.priceItem * currentValue.quantity;
  }, 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Visualizar pedido" variant="outline">
          <KanbanSquare size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do pedido</DialogTitle>
        </DialogHeader>

        <div>
          {listProducts.map((value) => {
            return (
              <div className="border-b-2 py-2" key={value.id}>
                <p>
                  {value.quantity}x - {value.nameItem} -{" "}
                  {value.priceItem.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            );
          })}

          <div className="my-4">
            <div className="w-full flex items-center justify-between my-2">
              <span className="font-bold">Forma de entrega:</span>
              <span>{nameDelivery}</span>
            </div>

            <div className="w-full flex items-center justify-between my-2">
              <span className="font-bold">Endereço:</span>
              <span>{clientDatas.address}</span>
            </div>
            <div className="w-full flex items-center justify-between my-2">
              <span className="font-bold">Complemento:</span>
              <span>{clientDatas.complement_address}</span>
            </div>
            <div className="w-full flex items-center justify-between my-2">
              <span className="font-bold">Número:</span>
              <span>{clientDatas.number_address}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="w-full border-t-2 py-4 border-black">
            <span className="font-bold">
              Total:{" "}
              {totalPrice.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <DialogClose>
            <Button variant="secondary">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
