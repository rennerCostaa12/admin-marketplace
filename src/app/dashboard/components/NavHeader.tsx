"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useAuthContext } from "@/contexts/Auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import pathLogo from "../../../assets/logomarketplace.png";

export function NavHeader() {
  const { datasUser, signOut } = useAuthContext();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  if (!isClient) {
    return null;
  }

  return (
    <header className="bg-primary px-2 py-2">
      <Container>
        <div className="flex items-center justify-between w-full">
          <div>
            <Image
              src={pathLogo}
              alt="logo-application"
              width={50}
              height={50}
            />
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
        </div>
      </Container>
    </header>
  );
}
