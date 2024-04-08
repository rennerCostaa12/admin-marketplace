"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AuthContextProvider } from "@/contexts/Auth";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
