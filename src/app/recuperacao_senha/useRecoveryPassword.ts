import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { FormSchema } from "./schema";
import { TypeFormSchema } from "./types";
import { RecoveryPasswordService } from "./service";

export const useRecoveryPassword = () => {
  const form = useForm<TypeFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isTokenUsed, setIsTokenUsed] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const getTokens = async () => {
    const responseToken = await RecoveryPasswordService.getTokensBlackList();

    if (responseToken?.status) {
      if (responseToken.data.response.black_list_tokens.includes(token)) {
        setIsTokenUsed(true);
      }
    } else {
      toast.error(responseToken?.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const saveTokenBlackList = async () => {
    const responseToken = await RecoveryPasswordService.saveTokenBlackList(
      token as string
    );

    if (!responseToken?.status) {
      toast.error(responseToken?.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChangePassword = async (data: TypeFormSchema) => {
    setLoading(true);

    const responseChangePassword = await RecoveryPasswordService.changePassword(
      data,
      token as string
    );

    if (responseChangePassword?.status) {
      toast.success(responseChangePassword.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });

      saveTokenBlackList();

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      toast.error(responseChangePassword?.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setLoading(false);
  };

  return {
    form,
    getTokens,
    isTokenUsed,
    router,
    handleChangePassword,
    loading,
  };
};
