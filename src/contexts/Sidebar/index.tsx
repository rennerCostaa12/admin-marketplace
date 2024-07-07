import { useContext, createContext, useState } from "react";

import { ContextSidebarProps, SidebarContextProviderProps } from "./types";

export const SidebarContext = createContext<ContextSidebarProps | undefined>(
  undefined
);

export const SidebarContextProvider = ({
  children,
}: SidebarContextProviderProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const response = useContext(SidebarContext);

  if (response === undefined) {
    throw new Error(
      "useSidebarContext needs to be used inside SidebarContextProvider"
    );
  }

  return response;
};
