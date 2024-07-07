import { z } from "zod";
import { ProductsProps } from "@/Types";
import { FormSchema } from "./schema";

export interface ButtonEditProductsProps {
  dataProduct: ProductsProps | null;
}

export type TypeFormSchema = z.infer<typeof FormSchema>;
