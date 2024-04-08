import { useRouter } from "next/navigation";
import { Trash, Search } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchProduct = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();

  const handleSearchProducts = () => {
    if (searchValue.length > 0) {
      router.push(`dashboard?productName=${searchValue}`);
    }
  };

  const handleClearSearch = () => {
    router.push(`dashboard?page=1`);
    setSearchValue("");
  };

  return (
    <div className="max-w-lg my-4 flex items-center gap-4">
      <div className="flex gap-4 my-4">
        <Input
          className="max-w-80"
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
