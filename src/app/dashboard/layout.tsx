import type { Metadata } from "next";
import { NavHeader } from "@/components/NavHeader";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Tela controle de produtos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <NavHeader />
        {children}
      </body>
    </html>
  );
}
