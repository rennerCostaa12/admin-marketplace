import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useAuthContext } from "@/contexts/Auth";

import { ProductsProps } from "@/Types";
import { TypeFormSchema } from "./types";
import { FormSchema } from "./schema";

import { ServiceButtonEditProducts } from "./service";

export const useButtonEditProducts = () => {
  const { control, setValue, handleSubmit } = useForm<TypeFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nameProduct: "",
      categoryProduct: "",
      urlImg: "",
      statusProduct: "false",
      qntProduct: "",
      priceProduct: "R$ 0,00",
    },
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { datasUser } = useAuthContext();
  const router = useRouter();
  const { toast } = useToast();

  const handleEditProduct = async (
    data: TypeFormSchema,
    dataProduct: ProductsProps | null
  ) => {
    setLoading(true);

    const responseEditProduct = await ServiceButtonEditProducts.editProduct(
      data,
      dataProduct,
      datasUser
    );

    toast({
      title: responseEditProduct?.message,
      variant: responseEditProduct?.status ? "success" : "destructive",
    });

    if (responseEditProduct?.status) {
      setOpenModal(false);
      router.refresh();
    }

    setLoading(false);
  };

  return {
    openModal,
    setOpenModal,
    loading,
    setLoading,
    handleEditProduct,
    handleSubmit,
    Controller,
    control,
    setValue,
  };
};
