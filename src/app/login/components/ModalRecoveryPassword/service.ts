import { Api } from "@/configs/Api";
import axios from "axios";

export const ModalRecoveryPasswordServices = {
  sendEmailRecoveryPassword: async (email: string) => {
    try {
      const responseEmail = await Api.post("email/recovery-password", {
        email_user: email,
      });

      if (responseEmail.status) {
        return {
          status: true,
          message: "Email enviado com sucesso",
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
