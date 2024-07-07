"use client";

import { Pencil } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { ButtonEditSalesProps } from "./types";

import { useButtonEditSales } from "./useButtonEditSales";

export const ButtonEditSales = ({ dataSales }: ButtonEditSalesProps) => {
  const { handleUpdateStatus, loading, setStatusSales } = useButtonEditSales();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Pencil size={16} />
          Editar
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Alterar status do pedido
            </h4>
          </div>
          <div>
            <Select onValueChange={(value) => setStatusSales(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">AGUARDANDO VISUALIZAÇÃO</SelectItem>
                <SelectItem value="3">PREPARANDO PEDIDO</SelectItem>
                <SelectItem value="2">A CAMINHO</SelectItem>
                <SelectItem value="1">FINALIZADO</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-t-2 space-y-4 py-2 w-full">
            <Button
              className="w-full"
              onClick={() => handleUpdateStatus(dataSales)}
              loading={loading}
            >
              Salvar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
