"use client";

import { useAuthContext } from "@/contexts/Auth";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import Image from "next/image";
import { useRouter } from "next/navigation";

import pathLogo from "../assets/logomarketplace.png";

export function NavHeader() {
  const { datasUser, signOut } = useAuthContext();

  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between w-full bg-deep-pink px-2 py-2">
      <div>
        <Image src={pathLogo} alt="logo-application" width={50} height={50} />
      </div>

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {datasUser?.username}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleSignOut}>Sair</MenuItem>
        </MenuList>
      </Menu>
    </nav>
  );
}
