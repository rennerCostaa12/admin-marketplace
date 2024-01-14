"use client";

import { Button, Select } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaTrash } from "react-icons/fa";

import { useRouter, usePathname } from "next/navigation";

import { useState } from "react";

import { Select as SelectReact } from "chakra-react-select";

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
    <div className="flex items-center gap-4">
      <SelectReact
        size="md"
        className="w-full"
        colorScheme="purple"
        placeholder={placeholder}
        options={options}
        onChange={(event) => setCodeClientSelected(event?.value)}
      />

      <Select
        placeholder="Status"
        onChange={(event) => setStatusSelected(event.target.value)}
      >
        <option value="Aguardando Visualização">AGUARDANDO VISUALIZAÇÃO</option>
        <option value="Preparando Pedido">PREPARANDO PEDIDO</option>
        <option value="A Caminho">A CAMINHO</option>
        <option value="Finalizado">FINALIZADO</option>
      </Select>

      <Button
        size="md"
        colorScheme="pink"
        onClick={handleRedirectSearch}
        title="Pesquisar"
      >
        <SearchIcon />
      </Button>
      <Button
        size="md"
        colorScheme="pink"
        variant="ghost"
        onClick={handleClearSearch}
        title="Limpar pesquisa"
      >
        <FaTrash size={30} />
      </Button>
    </div>
  );
}
