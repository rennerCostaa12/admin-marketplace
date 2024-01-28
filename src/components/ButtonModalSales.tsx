"use client";

import { useRef } from "react";

import { FaFileInvoice } from "react-icons/fa";

import {
  Button,
  Modal as ModalChakra,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { SalesProductsProps, ClientSalesProps } from "@/Types";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const totalPrice = listProducts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.priceItem * currentValue.quantity;
  }, 0);

  return (
    <div>
      <Button onClick={onOpen} title="Visualizar pedido" variant="outline">
        <FaFileInvoice />
      </Button>
      <ModalChakra
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do pedido</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            {listProducts.map((value) => {
              return (
                <div className="border-b-2 py-2">
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
          </ModalBody>
          <ModalFooter justifyContent="flex-start">
            <div className="w-full border-t-2 py-4 border-black">
              <span className="font-bold">
                Total:{" "}
                {totalPrice.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </ModalFooter>
        </ModalContent>
      </ModalChakra>
    </div>
  );
}
