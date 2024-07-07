import { useAuthContext } from "@/contexts/Auth";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const useNavHeader = () => {
  const { datasUser } = useAuthContext();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const namePage = pathname.split("/").pop()?.replaceAll("-", " ");

  return {
    datasUser,
    pathname,
    isClient,
    setIsClient,
    namePage
  };
};
