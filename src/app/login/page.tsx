"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";

import { useAuthContext } from "@/contexts/Auth";

import pathImgLogin from "../../assets/marketplace-login.png";
import { Utils } from "@/utils";

export default function Login() {
  const { signIn } = useAuthContext();

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email === "" || password === "") {
      toast.warn("Preencha os campos!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      setLoading(true);
      const responseSignIn = await signIn(email, password);

      if (responseSignIn.status) {
        router.push("/dashboard?page=1");
      } else {
        toast.error(responseSignIn.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userIsAuthenticated = Utils.checkSessionUser();

    if (userIsAuthenticated) {
      router.push("/dashboard?page=1");
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
          onSubmit={handleLogin}
        >
          <h1 className="text-black text-2xl text-center mb-4 font-bold">
            LOGIN
          </h1>

          <div className="w-full flex flex-col gap-4">
            <Input name="email" placeholder="Email" type="email" />
            <Input name="password" placeholder="Senha" type="password" />

            <span className="text-slate-600 text-right cursor-pointer text-sm hover:text-black ease-in duration-300">
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
