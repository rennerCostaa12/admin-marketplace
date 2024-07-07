"use client";

import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import { AlertModal } from "@/components/AlertModal";
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
import { useRecoveryPassword } from "./useRecoveryPassword";

export default function RecoveryPassword() {
  const {
    getTokens,
    form,
    isTokenUsed,
    handleChangePassword,
    loading,
    router,
  } = useRecoveryPassword();

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
