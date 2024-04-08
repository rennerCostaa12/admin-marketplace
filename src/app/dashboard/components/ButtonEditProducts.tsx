import { Pencil } from "lucide-react";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

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

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { ProductsProps } from "@/Types";
import { Masks } from "@/utils/masks";

import { Api } from "@/configs/Api";

import { useToast } from "@/components/ui/use-toast";

import { useAuthContext } from "@/contexts/Auth";

interface ButtonEditProductsProps {
  dataProduct: ProductsProps | null;
}

export const ButtonEditProducts = ({
  dataProduct,
}: ButtonEditProductsProps) => {
  const [nameProduct, setNameProduct] = useState<string>("");
  const [categoryProduct, setCategoryProduct] = useState<string>("");
  const [urlImg, setUrlImg] = useState<string>("");
  const [statusProduct, setStatusProduct] = useState<string>("false");
  const [qntProduct, setQntProduct] = useState<string>("");
  const [priceProduct, setPriceProduct] = useState<string>("R$ 0,00");

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const { datasUser } = useAuthContext();

  const router = useRouter();

  const { toast } = useToast();

  const handleEditProduct = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const responseEditProduct = await Api.patch(
        `products/${dataProduct?.id}`,
        {
          name: nameProduct,
          price: Masks.setRemoveMoney(priceProduct),
          stock: Number(qntProduct),
          img_product: urlImg,
          unavailable: statusProduct === "true" ? true : false,
          categories: Number(categoryProduct),
          admin: datasUser?.id,
        }
      );

      if (responseEditProduct.status) {
        toast({
          title: "Produto editado com sucesso!",
          variant: "success",
        });
        setOpenModal(false);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao editar produto!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataProduct) {
      setNameProduct(dataProduct?.name);
      setPriceProduct(
        dataProduct?.price.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })
      );
      setQntProduct(Masks.setOnlyNumber(String(dataProduct?.stock)));
      setUrlImg(dataProduct?.img_product);
      setCategoryProduct(String(dataProduct?.categories?.id));
      setStatusProduct(dataProduct?.unavailable ? "true" : "false");
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
        <form className="grid gap-4 py-4" onSubmit={handleEditProduct}>
          <div>
            <Input
              name="name_product"
              type="text"
              placeholder="Nome do produto"
              value={nameProduct}
              onChange={(event) => setNameProduct(event.target.value)}
              required
            />
          </div>
          <div>
            <Input
              name="price_product"
              type="text"
              placeholder="Preço"
              required
              value={priceProduct}
              onChange={(event) =>
                setPriceProduct(Masks.setMoney(event.target.value))
              }
            />
          </div>
          <div>
            <Input
              name="qnt_product"
              type="text"
              placeholder="Quantidade"
              required
              value={qntProduct}
              onChange={(event) =>
                setQntProduct(Masks.setOnlyNumber(event.target.value))
              }
            />
          </div>
          <div>
            <Input
              name="url_img"
              type="text"
              placeholder="Url da imagem"
              value={urlImg}
              onChange={(event) => setUrlImg(event.target.value)}
              required
            />
          </div>
          <div>
            <Select
              name="status_product"
              onValueChange={(value) => setStatusProduct(value)}
              value={statusProduct}
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
          </div>
          <div>
            <Select
              name="category_product"
              onValueChange={(value) => setCategoryProduct(value)}
              value={categoryProduct}
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
