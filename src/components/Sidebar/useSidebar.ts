"use client";

import { useAuthContext } from "@/contexts/Auth";
import { usePathname, useRouter } from "next/navigation";

export const useSidebar = () => {
  const { signOut } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  const namePage = pathname.split("/").pop();

  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  const formatUrl = (name: string) => {
    return name.toLocaleLowerCase().replaceAll(" ", "-");
  };

  return {
    handleSignOut,
    namePage,
    formatUrl,
  };
};
