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

import { useRouter, usePathname } from "next/navigation";

import { useState } from "react";

import { OptionsSelectSearchProps } from "@/Types";

interface SelectSearchProps {
  placeholder: string;
  options: OptionsSelectSearchProps[];
}

export default function SelectSearch({
  placeholder,
  options,
}: SelectSearchProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [codeClientSelected, setCodeClientSelected] = useState<
    string | undefined
  >(undefined);
  const [statusSelected, setStatusSelected] = useState<string>("");

  // const [isLoading, setIsLoading] = useState(false);

  const handleRedirectSearch = () => {
    router.push(
      `${pathname}/?id=${
        codeClientSelected ? codeClientSelected : ""
      }&status=${statusSelected}&page=1`
    );
  };

  const handleClearSearch = () => {
    router.push(`${pathname}?page=1`);
  };

  return (
    <div className="flex items-center gap-4 w-full">
      {/* <SelectReact
        size="md"
        className="w-full"
        colorScheme="purple"
        placeholder={placeholder}
        options={options}
        onChange={(event) => setCodeClientSelected(event?.value)}
      /> */}

      <Select
        className="w-72"
        isClearable
        isSearchable
        name="customers"
        options={options}
        placeholder="Clientes"
        onChange={(value) => setCodeClientSelected(value?.value)}
      />

      <SelectUI onValueChange={(value) => setStatusSelected(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
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
