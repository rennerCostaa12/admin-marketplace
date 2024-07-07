"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Masks } from "@/utils/masks";

import { categories_products } from "@/constants/categories_product";
import { useFormRegisterProduct } from "./useFormRegisterProduct";

export const FormRegisterProduct = () => {
  const {
    nameProduct,
    setNameProduct,
    categoryProduct,
    setCategoryProduct,
    urlImg,
    setUrlImg,
    statusProduct,
    setStatusProduct,
    qntProduct,
    setQntProduct,
    priceProduct,
    setPriceProduct,
    loading,
    handleRegisterProduct,
  } = useFormRegisterProduct();

  return (
    <form onSubmit={handleRegisterProduct}>
      <Input
        name="name_product"
        className="my-4"
        type="text"
        placeholder="Nome do produto"
        value={nameProduct}
        onChange={(event) => setNameProduct(event.target.value)}
        required
      />
      <Input
        name="price_product"
        className="my-4"
        type="text"
        placeholder="Preço"
        required
        value={priceProduct}
        onChange={(event) =>
          setPriceProduct(Masks.setMoney(event.target.value))
        }
      />
      <Input
        name="qnt_product"
        className="my-4"
        type="text"
        placeholder="Quantidade"
        required
        value={qntProduct}
        onChange={(event) =>
          setQntProduct(Masks.setOnlyNumber(event.target.value))
        }
      />
      <Input
        name="url_img"
        className="my-4"
        type="text"
        placeholder="Url da imagem"
        value={urlImg}
        onChange={(event) => setUrlImg(event.target.value)}
        required
      />
      <div className="my-4">
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
      <div className="my-4">
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
              <SelectItem value={String(categories_products.food)}>
                Comida
              </SelectItem>
              <SelectItem value={String(categories_products.drink)}>
                Bebida
              </SelectItem>
              <SelectItem value={String(categories_products.cleaning)}>
                Limpeza
              </SelectItem>
              <SelectItem value={String(categories_products.toys)}>
                Brinquedos
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button className="w-full" type="submit" loading={loading}>
          Salvar
        </Button>
      </div>
    </form>
  );
};
