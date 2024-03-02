"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

export default function ButtonUpdate() {
  const router = useRouter();

  const handleUpdate = () => {
    router.refresh();
  };

  return (
    <Button onClick={handleUpdate}>
      <RefreshCcw size={16} />
      Atualizar
    </Button>
  );
}
