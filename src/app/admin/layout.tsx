import type { Metadata } from "next";

import { NavHeader } from "@/components/NavHeader";
import { Sidebar } from "@/components/Sidebar/Sidebar";


export const metadata: Metadata = {
  title: "Admin",
  description: "Tela de administração da loja",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <div className="pl-[250px] flex-1 transition-all duration-300 data-[collapsed=true]:pl-16 ">
        <NavHeader />
        {children}
      </div>
    </main>
  );
}
