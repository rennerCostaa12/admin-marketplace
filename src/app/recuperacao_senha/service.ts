import axios from "axios";

import { Api } from "@/configs/Api";
import { TypeFormSchema } from "./types";

export const RecoveryPasswordService = {
  getTokensBlackList: async () => {
    try {
      const responseTokens = await axios.get("api/black_lists_tokens");

      if (responseTokens.status) {
        return {
          status: true,
          message: "Lista de tokens capturadas com sucesso",
          codeStatus: 200,
          data: responseTokens.data,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: false,
          message: error.response.data.message,
          codeStatus: error.response.status,
          data: null,
        };
      }
    }
  },
  saveTokenBlackList: async (token: string) => {
    try {
      const responseSaveTokenBlacklist = await axios.post(
        "api/black_lists_tokens",
        {
          token,
        }
      );

      if (responseSaveTokenBlacklist.status) {
        return {
          status: true,
          message: "Token armazenado com sucesso",
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
  changePassword: async (data: TypeFormSchema, token: string) => {
    try {
      const responseChangePassword = await Api.post("admins/change-password", {
        password: data.password,
        confirm_password: data.confirm_password,
        token,
      });

      if (responseChangePassword.status) {
        return {
          status: true,
          message: "Senha alterada com sucesso",
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
