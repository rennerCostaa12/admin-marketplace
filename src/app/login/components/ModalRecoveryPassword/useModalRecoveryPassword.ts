import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

import { ModalRecoveryPasswordServices } from "./service";

export const useModalRecoveryPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendEmail = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as any);

    const email = formData.get("email");

    setLoading(true);

    const responseRecoveryPassword =
      await ModalRecoveryPasswordServices.sendEmailRecoveryPassword(
        email as string
      );

    if (responseRecoveryPassword?.status) {
      toast.success(responseRecoveryPassword.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(responseRecoveryPassword?.message, {
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
    loading,
    handleSendEmail,
  };
};
