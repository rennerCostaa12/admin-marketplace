"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Utils } from "@/utils";

interface RoutesProps {
  children: ReactNode;
}

export default function RoutesPrivates({ children }: RoutesProps) {
  const router = useRouter();

  const userIsAuthenticated = Utils.checkSessionUser();

  useEffect(() => {
    if (!userIsAuthenticated) {
      router.push("/login");
    }
  }, [userIsAuthenticated, router.push]);

  return (
    <>
      {!userIsAuthenticated && null}
      {userIsAuthenticated && children}
    </>
  );
}
