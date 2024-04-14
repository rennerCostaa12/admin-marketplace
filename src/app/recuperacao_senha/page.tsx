"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Api } from "@/configs/Api";
import { ToastContainer, toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { AlertModal } from "@/components/AlertModal";

const FormSchema = z.object({
  password: z.string().min(7, {
    message: "A senha deve ter pelo menos 7 caracteres.",
  }),
  confirm_password: z.string().min(7, {
    message: "A confirmação de senha deve ter pelo menos 7 caracteres.",
  }),
});

type TypeFormSchema = z.infer<typeof FormSchema>;

export default function RecoveryPassword() {
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
    try {
      const responseTokens = await axios.get("api/black_lists_tokens");

      if (responseTokens.status) {
        if (responseTokens.data.response.black_list_tokens.includes(token)) {
          setIsTokenUsed(true);
        }
      }
    } catch (error) {
      const responseError = error as AxiosError<any, any>;
      toast.error(responseError.response?.data.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const saveTokenBlackList = async () => {
    try {
      await axios.post("api/black_lists_tokens", {
        token,
      });
    } catch (error) {
      const responseError = error as AxiosError<any, any>;
      toast.error(responseError.response?.data.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChangePassword = async (data: TypeFormSchema) => {
    try {
      setLoading(true);
      const responseChangePassword = await Api.post("admins/change-password", {
        password: data.password,
        confirm_password: data.confirm_password,
        token,
      });

      if (responseChangePassword.status) {
        toast.success("Senha trocada com sucesso!", {
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
      }
    } catch (error) {
      const responseError = error as AxiosError<any, any>;
      toast.error(responseError.response?.data.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <main className="flex justify-center items-center w-full h-screen">
      {isTokenUsed && (
        <AlertModal
          title="Token inválido"
          description="Este token que você está usando já foi utilizado ou é inválido! Por favor, tente outro."
          footer={<Button onClick={() => router.push("/login")}>Ok</Button>}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Form {...form}>
        <form
          className="flex flex-col justify-between items-center w-1/3 h-96 border-2 p-4"
          onSubmit={form.handleSubmit(handleChangePassword)}
        >
          <h1 className="text-center text-2xl font-bold">Alteração de Senha</h1>

          <div className="w-full flex flex-col gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field: { onChange, name, value } }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      onChange={onChange}
                      name={name}
                      value={value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field: { onChange, name, value } }) => (
                <FormItem>
                  <FormLabel>Confirmação de Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      onChange={onChange}
                      name={name}
                      value={value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full justify-center flex gap-4">
            <Button className="w-full" variant="outline" type="button">
              <Link className="w-full" href="/login">
                Cancelar
              </Link>
            </Button>
            <Button className="w-full" type="submit" loading={loading}>
              Alterar Senha
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
