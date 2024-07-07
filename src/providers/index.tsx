"use client";

import { ReactNode } from "react";

import { AuthContextProvider } from "@/contexts/Auth";
import { SidebarContextProvider } from "@/contexts/Sidebar";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthContextProvider>
      <SidebarContextProvider>{children}</SidebarContextProvider>
    </AuthContextProvider>
  );
};
