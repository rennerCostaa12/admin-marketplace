"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ModalRecoveryPasswordProps } from "./types";
import { useModalRecoveryPassword } from "./useModalRecoveryPassword";

export const ModalRecoveryPassword = ({
  openModalRecoveryPassword,
  setOpenModalRecoveryPassword,
}: ModalRecoveryPasswordProps) => {
  const { handleSendEmail, loading } = useModalRecoveryPassword();

  return (
    <div>
      <Dialog
        modal={true}
        open={openModalRecoveryPassword}
        onOpenChange={() =>
          setOpenModalRecoveryPassword(!openModalRecoveryPassword)
        }
      >
        <DialogContent className="sm:max-w-[425px]">
          <form className="flex flex-col gap-4" onSubmit={handleSendEmail}>
            <DialogHeader>
              <DialogTitle>Recuperação de senha</DialogTitle>
              <DialogDescription>
                Insira seu e-mail e lhe enviaremos um código para que você
                recupere sua senha.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Label htmlFor="email" className="block mb-2">
                Email
              </Label>
              <Input className="w-full" type="email" name="email" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" loading={loading}>
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
