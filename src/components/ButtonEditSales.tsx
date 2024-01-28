"use client";

import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverFooter,
  ButtonGroup,
  useDisclosure,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useState } from "react";

import { SalesProps } from "@/Types";
import { Api } from "@/configs/Api";

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

  const { isOpen, onToggle, onClose } = useDisclosure();

  const toast = useToast();

  const router = useRouter();

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
      toast({
        title: "Status alterado com sucesso!",
        description: "",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
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
          title: "Status alterado com sucesso!",
          description: "",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        onClose();

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur
      closeOnEsc
    >
      <PopoverTrigger>
        <Button
          onClick={onToggle}
          leftIcon={<EditIcon />}
          colorScheme="pink"
          variant="solid"
          size="sm"
        >
          Editar
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <div className="w-full flex justify-center">
            <Text fontSize="md" as="b" align="center">
              Alterar status do pedido
            </Text>
          </div>
        </PopoverHeader>
        <PopoverBody>
          <Select
            placeholder="Escolha o status"
            onChange={(event) => setIdSaleSelected(Number(event.target.value))}
          >
            <option value={4}>AGUARDANDO VISUALIZAÇÃO</option>
            <option value={3}>PREPARANDO PEDIDO</option>
            <option value={2}>A CAMINHO</option>
            <option value={1}>FINALIZADO</option>
          </Select>
        </PopoverBody>
        <PopoverFooter>
          <ButtonGroup size="sm">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="pink"
              onClick={handleUpdateStatus}
              isLoading={loading}
            >
              Salvar
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
