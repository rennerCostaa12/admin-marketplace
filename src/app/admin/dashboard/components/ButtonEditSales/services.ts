import { Api } from "@/configs/Api";

import { SalesProps } from "@/Types";
import axios from "axios";

export const ServicesStatusSales = {
  updateStatusSales: async (
    dataSales: SalesProps,
    statusSales: number | null
  ) => {
    try {
      const repsonseUpdate = await Api.patch(`sales/${dataSales.id}`, {
        status: statusSales,
      });

      if (repsonseUpdate.status) {
        return {
          status: true,
          message: "Status atualizado com sucesso",
          codeStatus: 200,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: false,
          message: error.response.data.message,
          codeStatus: error.response.status,
        };
      }
    }
  },

  sendAppNotification: async (message: string, deviceToken: string) => {
    try {
      const responseSendNotification = await axios.post(
        process.env.NEXT_PUBLIC_URL_PUSH_NOTIFICATION as string,
        {
          token_push_notification: deviceToken,
          message: message,
        }
      );

      if (responseSendNotification.status) {
        return {
          status: true,
          message: "Mensagem enviada com sucesso",
          codeStatus: 200,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: false,
          message: error.response.data.message,
          codeStatus: error.response.status,
        };
      }
    }
  },
};
