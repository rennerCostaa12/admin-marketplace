import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import { SalesProps } from "@/Types";
import { ServicesStatusSales } from "./services";

export const useButtonEditSales = () => {
  const [statusSales, setStatusSales] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const switchMessageNotification = (id: number) => {
    switch (id) {
      case 1:
        return "Seu pedido está em aguardando visualização";
      case 2:
        return "Seu pedido está a caminho";
      case 3:
        return "Estamos preparando seu pedido";
      case 4:
        return "Seu pedido foi finalizado";
      default:
        return undefined;
    }
  };

  const handleUpdateStatus = async (dataSales: SalesProps) => {
    if (!statusSales || statusSales === 0) {
      alert("Escolha o status para alterar");
      return;
    }

    const messageNotification = switchMessageNotification(statusSales);

    setLoading(true);

    const response = await ServicesStatusSales.updateStatusSales(
      dataSales,
      statusSales
    );

    toast({
      title: response?.message,
      variant: response?.status ? "success" : "destructive",
    });

    router.refresh();

    dataSales.client.listDevicesToken.forEach((token: string) => {
      ServicesStatusSales.sendAppNotification(
        messageNotification as string,
        token
      );
    });

    setLoading(false);
  };

  return {
    handleUpdateStatus,
    loading,
    setLoading,
    setStatusSales,
    statusSales,
  };
};
