import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSearchProduct = () => {
    const [searchValue, setSearchValue] = useState<string>("");

    const router = useRouter();
  
    const handleSearchProducts = () => {
      if (searchValue.length > 0) {
        router.push(`/admin/listagem-de-produtos?productName=${searchValue}`);
      }
    };
  
    const handleClearSearch = () => {
      router.push(`/admin/listagem-de-produtos?page=1`);
      setSearchValue("");
    };

    return {
        handleSearchProducts,
        handleClearSearch,
        searchValue,
        setSearchValue
    }
}