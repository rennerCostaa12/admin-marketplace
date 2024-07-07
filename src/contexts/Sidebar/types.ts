import { ReactNode } from "react";

export interface ContextSidebarProps {
    showSidebar: boolean;
    setShowSidebar: (data: boolean) => void;
}

export interface SidebarContextProviderProps {
    children: ReactNode;
}