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
import { Api } from "@/configs/Api";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface ModalRecoveryPasswordProps {
  openModalRecoveryPassword: boolean;
  setOpenModalRecoveryPassword: (data: boolean) => void;
}

export const ModalRecoveryPassword = ({
  openModalRecoveryPassword,
  setOpenModalRecoveryPassword,
}: ModalRecoveryPasswordProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendEmail = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as any);

    const email = formData.get("email");

    try {
      setLoading(true);
      const responseEmail = await Api.post("email/recovery-password", {
        email_user: email,
      });

      if (responseEmail.status) {
        toast.success("Email enviado com sucesso", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      const responseError = error as AxiosError<any, any>;
      toast.error(responseError.response?.data.message, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

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
