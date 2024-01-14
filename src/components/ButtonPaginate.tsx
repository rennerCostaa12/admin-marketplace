"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@chakra-ui/react";

export default function ButtonPaginate() {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();

  const currentPage = Number(params.get("page"));

  const handleNextPage = () => {
    router.push(`${pathname}?page=${currentPage + 1}`);
  };

  return (
    <Button
      onClick={handleNextPage}
      size="md"
      colorScheme="pink"
      variant="outline"
    >
      Ver Mais
    </Button>
  );
}
