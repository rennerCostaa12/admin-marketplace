import { Trash, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSearchProduct } from "./useSearchProduct";

export const SearchProduct = () => {
  const {
    handleClearSearch,
    handleSearchProducts,
    searchValue,
    setSearchValue,
  } = useSearchProduct();

  return (
    <div className="max-w-full my-4 flex justify-normal items-center gap-4">
      <div className="w-2/6 flex gap-4 my-4">
        <Input
          className="max-w-full"
          placeholder="Pesquisar"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <Button onClick={handleSearchProducts} title="Pesquisar">
          <Search />
        </Button>
      </div>
      <div>
        <Button
          variant="ghost"
          onClick={handleClearSearch}
          title="Limpar pesquisa"
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
};
