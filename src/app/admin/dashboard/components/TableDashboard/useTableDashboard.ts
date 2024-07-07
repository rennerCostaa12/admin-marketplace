import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { ClientsProps } from "@/Types";
import { Utils } from "@/utils";

export const useTableDashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const clientsFormated = (allClients: ClientsProps[]) => {
    return allClients?.map((value) => {
      return {
        value: value.id,
        label: value.username,
      };
    });
  };


  const { switchColorsStatus } = Utils;

  return {
    searchParams,
    router,
    clientsFormated,
    switchColorsStatus
  };
};
