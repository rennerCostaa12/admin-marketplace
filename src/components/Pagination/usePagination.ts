import { usePathname, useRouter, useSearchParams } from "next/navigation";

let maxPageLimit = 5;
let minPageLimit = 1;

export const usePagination = () => {
  let pageNumbers: number[] = [];

  const iteratePages = (totalPages: number) => {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  };

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(params.get("page"));

  const handleSetPage = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };

  const handleNextPage = () => {
    router.push(`${pathname}?page=${currentPage + 1}`);
  };

  const handlePrevPage = () => {
    router.push(`${pathname}?page=${currentPage - 1}`);
  };

  if (currentPage > maxPageLimit) {
    maxPageLimit = maxPageLimit + 5;
    minPageLimit = minPageLimit + 5;
  } else if (currentPage < minPageLimit) {
    maxPageLimit = maxPageLimit - 5;
    minPageLimit = minPageLimit - 5;
  }

  return {
    handleSetPage,
    handleNextPage,
    handlePrevPage,
    iteratePages,
    currentPage,
    pageNumbers,
    maxPageLimit,
    minPageLimit
  };
};
