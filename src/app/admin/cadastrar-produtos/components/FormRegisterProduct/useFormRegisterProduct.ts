import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/contexts/Auth";
import { Masks } from "@/utils/masks";
import { FormEvent, useState } from "react";

import { FormRegisterProductServices } from "./services";

export const useFormRegisterProduct = () => {
  const [nameProduct, setNameProduct] = useState<string>("");
  const [categoryProduct, setCategoryProduct] = useState<string>("");
  const [urlImg, setUrlImg] = useState<string>("");
  const [statusProduct, setStatusProduct] = useState<string>("false");
  const [qntProduct, setQntProduct] = useState<string>("");
  const [priceProduct, setPriceProduct] = useState<string>("R$ 0,00");
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const { datasUser } = useAuthContext();

  const resetInputs = () => {
    setNameProduct("");
    setCategoryProduct("");
    setUrlImg("");
    setStatusProduct("false");
    setQntProduct("");
    setPriceProduct("R$ 0,00");
    setLoading(false);
  };

  const handleRegisterProduct = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    const priceProductFormated = Masks.setRemoveMoney(priceProduct);

    const response = await FormRegisterProductServices.registerProduct(
      nameProduct,
      priceProductFormated,
      Number(qntProduct),
      urlImg,
      statusProduct === "true" ? true : false,
      Number(categoryProduct),
      datasUser
    );

    toast({
      title: response?.message,
      variant: response?.status ? "success" : "destructive",
    });

    if (response?.status) {
      resetInputs();
    }

    setLoading(false);
  };

  return {
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
    setLoading,
    toast,
    datasUser,
    handleRegisterProduct,
  };
};
