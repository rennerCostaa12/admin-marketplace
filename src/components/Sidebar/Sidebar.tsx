"use client";

import Link from "next/link";
import {
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  Plus,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";

import { useSidebar } from "./useSidebar";

export const Sidebar = () => {
  const { handleSignOut } = useSidebar();

  return (
    <div className="flex h-screen fixed z-10">
      <aside className="bg-primary border-r hidden md:flex flex-col items-start justify-between py-6 px-4 w-64 transition-all duration-300">
        <div className="flex flex-col items-start gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold text-white"
            prefetch={false}
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Marketplace</span>
          </Link>
          <nav className="flex flex-col items-start gap-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-white"
              prefetch={false}
            >
              <LayoutGridIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/listagem-de-produtos"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-white"
              prefetch={false}
            >
              <ShoppingBasket className="w-5 h-5" />
              <span>Listagem de produtos</span>
            </Link>
            <Link
              href="/admin/cadastrar-produtos"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-white"
              prefetch={false}
            >
              <Plus className="w-5 h-5" />
              <span>Cadastro de produtos</span>
            </Link>
          </nav>
        </div>
        <div
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-white cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOutIcon className="w-5 h-5" />
          <span>Logout</span>
        </div>
      </aside>

      {/* TABLET/MOBILE */}
      <div className="flex flex-col md:hidden w-full">
        <header className="bg-primary border-b flex items-center justify-between px-4 py-3">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold text-white"
            prefetch={false}
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Marketplace</span>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MenuIcon className="w-6 h-6 text-white" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </header>
        <div className="flex-1 overflow-auto bg-primary">
          <nav className="flex flex-col items-start gap-2 p-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-white"
              prefetch={false}
            >
              <LayoutGridIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/listagem-de-produtos"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-white"
              prefetch={false}
            >
              <ShoppingBasket className="w-5 h-5" />
              <span>Listagem de produtos</span>
            </Link>
            <Link
              href="/admin/cadastrar-produtos"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-white"
              prefetch={false}
            >
              <Plus className="w-5 h-5" />
              <span>Cadastro de produtos</span>
            </Link>
          </nav>
          <div
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-white p-4"
            onClick={handleSignOut}
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
