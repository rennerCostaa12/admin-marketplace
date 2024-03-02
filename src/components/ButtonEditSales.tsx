"use client";

import { Button } from "./ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useToast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useRouter } from "next/navigation";
import axios from "axios";

import { useState } from "react";

import { SalesProps } from "@/Types";
import { Api } from "@/configs/Api";
import { Pencil } from "lucide-react";

interface ButtonEditSalesProps {
  dataSales: SalesProps;
}

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

export const ButtonEditSales = ({ dataSales }: ButtonEditSalesProps) => {
  const [idSaleSelected, setIdSaleSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { toast } = useToast();

  const sendNotificationApp = async (message: string, deviceToken: string) => {
    try {
      setLoading(true);
      await axios.post(
        process.env.NEXT_PUBLIC_URL_PUSH_NOTIFICATION as string,
        {
          token_push_notification: deviceToken,
          message: message,
        }
      );
    } catch (error) {
      alert("Erro ao enviar notificação");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!idSaleSelected || idSaleSelected === 0) {
      alert("Escolha o status para alterar");
      return;
    }

    try {
      setLoading(true);

      const messageNotification = switchMessageNotification(idSaleSelected);

      const responseUpdatesStatus = await Api.patch(`sales/${dataSales.id}`, {
        status: idSaleSelected,
      });

      dataSales.client.listDevicesToken.forEach((token) => {
        sendNotificationApp(messageNotification as string, token);
      });

      if (responseUpdatesStatus.status) {
        toast({
          description: "Your message has been sent.",
        });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Pencil size={16} />
          Editar
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Alterar status do pedido
            </h4>
          </div>
          <div>
            <Select onValueChange={(value) => setIdSaleSelected(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">AGUARDANDO VISUALIZAÇÃO</SelectItem>
                <SelectItem value="3">PREPARANDO PEDIDO</SelectItem>
                <SelectItem value="2">A CAMINHO</SelectItem>
                <SelectItem value="1">FINALIZADO</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-t-2 space-y-4 py-2 w-full">
            <Button
              className="w-full"
              onClick={handleUpdateStatus}
              loading={loading}
            >
              Salvar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
