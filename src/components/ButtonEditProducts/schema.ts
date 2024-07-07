import { z } from "zod";

export const FormSchema = z.object({
  nameProduct: z.string(),
  categoryProduct: z.string(),
  urlImg: z.string(),
  statusProduct: z.string(),
  qntProduct: z.string(),
  priceProduct: z.string(),
});