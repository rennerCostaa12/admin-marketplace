import { useAuthContext } from "@/contexts/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import { FormSchema } from "./schema";
import { TypeFormSchema } from "./types";

export const useLogin = () => {
  const { control, setValue, reset, handleSubmit } = useForm<TypeFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [modalRecoveryPassword, setModalRecoveryPassword] =
    useState<boolean>(false);

  const router = useRouter();

  const { signIn } = useAuthContext();

  const handleLogin = async (data: TypeFormSchema) => {
    try {
      setLoading(true);
      const responseSignIn = await signIn(data.email, data.password);

      if (responseSignIn.status) {
        router.push("/admin/dashboard?page=1");
      } else {
        toast.error(responseSignIn.message, {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
    Controller,
    control,
    setValue,
    reset,
    modalRecoveryPassword,
    setModalRecoveryPassword,
    handleSubmit,
    router,
  };
};
