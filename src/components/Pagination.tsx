import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

let maxPageLimit = 5;
let minPageLimit = 1;

export const Pagination = ({ totalPages }: PaginationProps) => {
  let pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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

  return (
    <PaginationContainer>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationPrevious
            className="cursor-pointer"
            onClick={handlePrevPage}
          />
        )}
        <PaginationItem>
          {pageNumbers.map((index: number) => {
            if (index < maxPageLimit + 1 && index > minPageLimit - 1) {
              return (
                <PaginationLink
                  className="cursor-pointer"
                  key={index}
                  isActive={currentPage === index}
                  onClick={() =>
                    typeof index === "number" && handleSetPage(index)
                  }
                >
                  {index}
                </PaginationLink>
              );
            }
          })}
        </PaginationItem>
        {currentPage !== pageNumbers.pop() && (
          <PaginationNext className="cursor-pointer" onClick={handleNextPage} />
        )}
      </PaginationContent>
    </PaginationContainer>
  );
};
