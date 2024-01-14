import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "@/providers";

import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
