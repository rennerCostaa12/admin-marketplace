"use client";

import { useAuthContext } from "@/contexts/Auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";

import Image from "next/image";
import { useRouter } from "next/navigation";

import pathLogo from "../assets/logomarketplace.png";
import { LogOut } from "lucide-react";

export function NavHeader() {
  const { datasUser, signOut } = useAuthContext();

  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between w-full bg-deep-pink px-2 py-2">
      <div>
        <Image src={pathLogo} alt="logo-application" width={50} height={50} />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{datasUser?.username}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {datasUser?.username}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleSignOut}>Sair</MenuItem>
        </MenuList>
      </Menu> */}
    </header>
  );
}
