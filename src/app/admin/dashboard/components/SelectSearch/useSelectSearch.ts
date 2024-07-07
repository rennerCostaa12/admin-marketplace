import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const useSelectSearch = () => {
  const [codeClientSelected, setCodeClientSelected] = useState<
    string | undefined
  >(undefined);

  const [statusSelected, setStatusSelected] = useState<string>("null");

  const router = useRouter();
  const pathname = usePathname();

  const handleRedirectSearch = () => {
    router.push(
      `${pathname}/?id=${codeClientSelected ? codeClientSelected : ""}&status=${
        statusSelected !== "null" ? statusSelected : ""
      }&page=1`
    );
  };

  const handleClearSearch = () => {
    router.push(`${pathname}?page=1`);
    setStatusSelected("null");
  };

  return {
    handleRedirectSearch,
    handleClearSearch,
    setCodeClientSelected,
    statusSelected,
    setStatusSelected
  };
};
