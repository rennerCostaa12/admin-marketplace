"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { GrUpdate } from "react-icons/gr";

export default function ButtonUpdate() {
  const router = useRouter();

  const handleUpdate = () => {
    router.refresh();
  };

  return (
    <Button
      onClick={handleUpdate}
      leftIcon={<GrUpdate />}
      colorScheme="pink"
      variant="solid"
      size="md"
    >
      Atualizar
    </Button>
  );
}
