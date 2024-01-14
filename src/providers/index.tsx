"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { ChakraProvider } from "@chakra-ui/react";

import { AuthContextProvider } from "@/contexts/Auth";

import { Routes } from "@/constants/routes-privates";
import RoutesPrivates from "@/routes";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const pathname = usePathname();

  const isPublicRoute = Routes.routes_publics.includes(pathname);

  return (
    <ChakraProvider>
      <AuthContextProvider>
        {isPublicRoute && children}
        {!isPublicRoute && <RoutesPrivates>{children}</RoutesPrivates>}
      </AuthContextProvider>
    </ChakraProvider>
  );
};
