"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export default function ButtonPaginate() {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();

  const currentPage = Number(params.get("page"));

  const handleNextPage = () => {
    router.push(`${pathname}?page=${currentPage + 1}`);
  };

  return (
    <Button onClick={handleNextPage} variant="outline">
      Ver Mais
    </Button>
  );
}
