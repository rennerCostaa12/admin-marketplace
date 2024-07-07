import { Api } from "@/configs/Api";
import axios from "axios";

import { DatasUserProps } from "@/contexts/Auth/types";

export const FormRegisterProductServices = {
  registerProduct: async (
    nameProduct: string,
    priceProduct: number,
    qntProduct: number,
    urlImg: string,
    statusProduct: boolean,
    categoryProduct: number,
    datasUser: DatasUserProps | undefined
  ) => {
    try {
      const responseProduct = await Api.post("products", {
        name: nameProduct,
        price: priceProduct,
        stock: qntProduct,
        img_product: urlImg,
        unavailable: statusProduct,
        categories: categoryProduct,
        admin: datasUser?.id,
      });

      if (responseProduct.status) {
        return {
          status: true,
          message: "Produto cadastrado com sucesso!",
          codeStatus: 201,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: false,
          message: error.response.data.message,
          codeStatus: error.response.status,
        };
      }
    }
  },
};
