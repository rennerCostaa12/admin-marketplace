import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().email({ message: "Este campo é do tipo email" }),
  password: z.string().min(7, {
    message: "A senha deve ter pelo menos 7 caracteres.",
  }),
});
