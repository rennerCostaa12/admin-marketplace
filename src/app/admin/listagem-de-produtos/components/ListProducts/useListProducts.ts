import { useRouter, useSearchParams } from "next/navigation";

export const useListProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("page");
  const isProductFiltered = searchParams.get("productName");

  return {
    router,
    currentPage,
    isProductFiltered,
  };
};
