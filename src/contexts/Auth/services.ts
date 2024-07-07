import axios from "axios";

import { Api } from "@/configs/Api";

export const AuthService = {
  signIn: async (email: string, password: string) => {
    try {
      const responseSignIn = await Api.post("auth/login-admin", {
        email,
        password,
      });

      if (responseSignIn.status) {
        return {
          status: true,
          message: "Login efetuado com sucesso",
          statusCode: 200,
          data: responseSignIn.data,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: false,
          message: error.response.data.message,
          statusCode: error.response.status,
        };
      }
    }
  },
};
