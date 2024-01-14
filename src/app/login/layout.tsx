import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Tela de login da aplicação",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
