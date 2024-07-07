"use client";

import Image from "next/image";
import { useEffect } from "react"
;
import { Container } from "../Container";
import { useNavHeader } from "./useNavHeader";

export function NavHeader() {
  const { datasUser, isClient, setIsClient, namePage } = useNavHeader();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <header className="flex-none bg-white p-4 shadow-md">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              className="shadow-md max-md:hidden"
              src={require("../../assets/logo.png")}
              alt="logo marketplace"
              width={70}
            />
            <h1 className="text-2xl font-bold text-primary max-lg:text-xl">
              {namePage?.toLocaleUpperCase()}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <span className="block">Olá, seja bem vindo(a)!</span>
              <span className="block font-bold">{datasUser?.username}</span>
            </div>
            <Image
              className="rounded-full"
              src={require("../../assets/img-default-perfil.png")}
              alt="teste"
              width={70}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
