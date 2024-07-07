"use client";

import { Search, Trash } from "lucide-react";

import {
  Select as SelectUI,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Select from "react-select";

import { Button } from "@/components/ui/button";

import { SelectSearchProps } from "./types";

import { useSelectSearch } from "./useSelectSearch";

export default function SelectSearch({ options }: SelectSearchProps) {
  const {
    handleClearSearch,
    handleRedirectSearch,
    setCodeClientSelected,
    statusSelected,
    setStatusSelected,
  } = useSelectSearch();

  return (
    <div className="flex gap-4 w-full">
      <Select
        className="w-72"
        isClearable
        isSearchable
        name="customers"
        options={options}
        placeholder="Clientes"
        onChange={(value) => setCodeClientSelected(value?.value)}
      />

      <SelectUI
        value={statusSelected}
        onValueChange={(value) => setStatusSelected(value)}
      >
        <SelectTrigger className="w-1/5">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="null">Status</SelectItem>
          <SelectItem value="Aguardando Visualização">
            AGUARDANDO VISUALIZAÇÃO
          </SelectItem>
          <SelectItem value="Preparando Pedido">PREPARANDO PEDIDO</SelectItem>
          <SelectItem value="A Caminho">A CAMINHO</SelectItem>
          <SelectItem value="Finalizado">FINALIZADO</SelectItem>
        </SelectContent>
      </SelectUI>

      <Button onClick={handleRedirectSearch} title="Pesquisar">
        <Search />
      </Button>
      <Button
        variant="ghost"
        onClick={handleClearSearch}
        title="Limpar pesquisa"
      >
        <Trash />
      </Button>
    </div>
  );
}
