import Cookies from "universal-cookie";
import { createContext, useContext, useEffect, useState } from "react";

import { Api } from "@/configs/Api";
import { AuthService } from "./services";

import {
  AuthContextProviderProps,
  ContextAuthProps,
  DatasUserProps,
  SignInReturnProps,
} from "./types";

const AuthContext = createContext<ContextAuthProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [datasUser, setDatasUser] = useState<DatasUserProps | undefined>(
    undefined
  );

  const cookies = new Cookies();

  const updateHeaders = async (token?: string | undefined) => {
    if (token) {
      cookies.set("@Marketplace:admin_token_user", token);
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      const tokenStorage = cookies.get("@Marketplace:admin_token_user");

      if (tokenStorage) {
        Api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
      }
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<SignInReturnProps> => {
    const responseSignIn = await AuthService.signIn(email, password);

    if (responseSignIn?.status) {
      localStorage.setItem(
        "@Marketplace:admin_token_user",
        responseSignIn.data.access_token
      );
      localStorage.setItem(
        "@Marketplace:datas_user",
        JSON.stringify(responseSignIn.data.user)
      );
      setDatasUser(responseSignIn.data.user);

      updateHeaders(responseSignIn.data.access_token);
    }

    return {
      status: responseSignIn?.status ? responseSignIn.status : false,
      message: responseSignIn?.message,
    };
  };

  const signOut = () => {
    cookies.remove("@Marketplace:admin_token_user", { path: "/" });
    localStorage.removeItem("@Marketplace:admin_token_user");
    localStorage.removeItem("@Marketplace:datas_user");
  };

  useEffect(() => {
    const responseDatasUser = localStorage.getItem("@Marketplace:datas_user");

    if (responseDatasUser) {
      setDatasUser(JSON.parse(responseDatasUser));
    }
    updateHeaders();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, datasUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const response = useContext(AuthContext);

  if (!response) {
    throw new Error(
      "useAuthContext needs to be used inside AuthContextProvider"
    );
  }

  return response;
};
