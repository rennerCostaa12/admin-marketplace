import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

import { usePagination } from "./usePagination";

import { PaginationProps } from "./types";

export const Pagination = ({ totalPages }: PaginationProps) => {
  const {
    handleNextPage,
    handlePrevPage,
    handleSetPage,
    iteratePages,
    currentPage,
    maxPageLimit,
    minPageLimit,
    pageNumbers,
  } = usePagination();

  iteratePages(totalPages);

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
