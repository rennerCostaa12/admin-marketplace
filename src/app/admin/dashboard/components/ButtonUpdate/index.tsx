"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

import { useButtonUpdate } from "./useButtonUpdate";

export default function ButtonUpdate() {
  const { handleUpdate } = useButtonUpdate();

  return (
    <Button onClick={handleUpdate}>
      <RefreshCcw size={16} />
      Atualizar
    </Button>
  );
}
