import { Pencil } from "lucide-react";
import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "../Input";
import { Masks } from "@/utils/masks";

import { ButtonEditProductsProps } from "./types";
import { useButtonEditProducts } from "./useButtonEditProducts";

export const ButtonEditProducts = ({
  dataProduct,
}: ButtonEditProductsProps) => {
  const {
    handleSubmit,
    Controller,
    control,
    setValue,
    openModal,
    setOpenModal,
    handleEditProduct,
    loading,
  } = useButtonEditProducts();

  useEffect(() => {
    if (dataProduct) {
      setValue("nameProduct", dataProduct?.name);
      setValue(
        "priceProduct",
        dataProduct?.price.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })
      );
      setValue("qntProduct", Masks.setOnlyNumber(String(dataProduct?.stock)));
      setValue("urlImg", dataProduct?.img_product);
      setValue("categoryProduct", String(dataProduct?.categories?.id));
      setValue("statusProduct", dataProduct?.unavailable ? "true" : "false");
    }
  }, []);

  return (
    <Dialog
      modal={true}
      open={openModal}
      onOpenChange={() => setOpenModal(!openModal)}
    >
      <DialogTrigger asChild>
        <Button
          title="Editar Produto"
          variant="default"
          onClick={() => setOpenModal(true)}
        >
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={handleSubmit((event) =>
            handleEditProduct(event, dataProduct)
          )}
        >
          <div>
            <Controller
              control={control}
              name="nameProduct"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input.Root>
                  <Input.InputContent
                    placeholder="Nome do produto"
                    type="text"
                    onChange={onChange}
                    value={value}
                  />
                  {error?.message && (
                    <Input.InputMessage text={error.message} color="error" />
                  )}
                </Input.Root>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="priceProduct"
              render={({ field: { value }, fieldState: { error } }) => (
                <Input.Root>
                  <Input.InputContent
                    placeholder="Preço"
                    type="text"
                    onChange={(event) => {
                      const { value: valueInput } = event.target;
                      setValue("priceProduct", Masks.setMoney(valueInput));
                    }}
                    value={value}
                  />
                  {error?.message && (
                    <Input.InputMessage text={error.message} color="error" />
                  )}
                </Input.Root>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="qntProduct"
              render={({ field: { value }, fieldState: { error } }) => (
                <Input.Root>
                  <Input.InputContent
                    placeholder="Quantidade"
                    type="text"
                    onChange={(event) => {
                      const { value: valueInput } = event.target;
                      setValue("qntProduct", Masks.setOnlyNumber(valueInput));
                    }}
                    value={value}
                  />
                  {error?.message && (
                    <Input.InputMessage text={error.message} color="error" />
                  )}
                </Input.Root>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="urlImg"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input.Root>
                  <Input.InputContent
                    placeholder="Url da imagem"
                    type="text"
                    onChange={onChange}
                    value={value}
                  />
                  {error?.message && (
                    <Input.InputMessage text={error.message} color="error" />
                  )}
                </Input.Root>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="statusProduct"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <Select
                    name="status_product"
                    onValueChange={onChange}
                    value={value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status do Produto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status do Produto</SelectLabel>
                        <SelectItem value="false">Disponível</SelectItem>
                        <SelectItem value="true">Indisponível</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {error && (
                    <span className="text-sm text-red-500 mt-2">
                      {error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="categoryProduct"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <Select
                    onValueChange={onChange}
                    value={value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria do Produto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categoria do Produto</SelectLabel>
                        <SelectItem value="1">Comida</SelectItem>
                        <SelectItem value="3">Bebida</SelectItem>
                        <SelectItem value="4">Limpeza</SelectItem>
                        <SelectItem value="8">Brinquedos</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {error && (
                    <span className="text-sm text-red-500 mt-2">
                      {error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <DialogFooter>
            <DialogClose>
              <Button type="button" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button type="submit" loading={loading}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
