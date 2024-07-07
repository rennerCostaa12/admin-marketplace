"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

import { Button } from "@/components/ui/button";
import { ModalRecoveryPassword } from "./components/ModalRecoveryPassword";
import { Input } from "@/components/Input";
import { Utils } from "@/utils";
import pathImgLogin from "../../assets/marketplace-login.png";
import { useLogin } from "./useLogin";

export default function Login() {
  const {
    handleLogin,
    loading,
    setModalRecoveryPassword,
    modalRecoveryPassword,
    handleSubmit,
    router,
    Controller,
    control,
  } = useLogin();

  useEffect(() => {
    const userIsAuthenticated = Utils.checkSessionUser();

    if (userIsAuthenticated) {
      router.push("/admin/dashboard?page=1");
    }
  }, []);

  return (
    <main className="w-full h-screen flex justify-center items-center">
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

      <ModalRecoveryPassword
        openModalRecoveryPassword={modalRecoveryPassword}
        setOpenModalRecoveryPassword={setModalRecoveryPassword}
      />

      <div className="w-3/5 lg:h-3/6 min-w-96 h-auto flex flex-col lg:flex-row items-center border rounded">
        <div className="lg:w-3/5 w-full h-full max-h-full flex justify-center items-center bg-primary">
          <Image
            className="w-full"
            src={pathImgLogin}
            alt="img-login-default"
          />
        </div>

        <form
          className="lg:w-2/5 w-2/3 min-w-min h-full flex flex-col justify-center items-center bg-white lg:px-6 py-6"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h1 className="text-black text-2xl text-center mb-4 font-bold">
            LOGIN
          </h1>

          <div className="w-full flex flex-col gap-4">
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input.Root>
                  <Input.InputContent
                    placeholder="Email"
                    type="email"
                    onChange={onChange}
                    value={value}
                  />
                  {error?.message && (
                    <Input.InputMessage text={error.message} color="error" />
                  )}
                </Input.Root>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input.Root>
                  <Input.InputContent
                    placeholder="Senha"
                    type="password"
                    onChange={onChange}
                    value={value}
                  />
                  {error?.message && (
                    <Input.InputMessage text={error.message} color="error" />
                  )}
                </Input.Root>
              )}
            />

            <span
              className="text-slate-600 text-right cursor-pointer text-sm hover:text-black ease-in duration-300"
              onClick={() => setModalRecoveryPassword(true)}
            >
              Esqueci minha senha
            </span>

            <Button type="submit" className="mt-6" loading={loading}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
