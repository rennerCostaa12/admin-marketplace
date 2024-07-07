import axios from "axios";

import { Api } from "@/configs/Api";
import { ProductsProps } from "@/Types";
import { TypeFormSchema } from "./types";
import { DatasUserProps } from "@/contexts/Auth/types";
import { Masks } from "@/utils/masks";

export const ServiceButtonEditProducts = {
  editProduct: async (
    data: TypeFormSchema,
    dataProduct: ProductsProps | null,
    datasUser: DatasUserProps | undefined
  ) => {
    try {
      const responseEditProduct = await Api.patch(
        `products/${dataProduct?.id}`,
        {
          name: data.nameProduct,
          price: Masks.setRemoveMoney(data.priceProduct),
          stock: Number(data.qntProduct),
          img_product: data.urlImg,
          unavailable: data.statusProduct === "true" ? true : false,
          categories: Number(data.categoryProduct),
          admin: datasUser?.id,
        }
      );

      if (responseEditProduct.status) {
        return {
          status: true,
          message: "Produto editado com sucesso!",
          statusCode: 200,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: false,
          message: error.response.data.message,
          statusCode: error.response.status,
        };
      }
    }
  },
};
