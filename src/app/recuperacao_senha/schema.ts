import { z } from "zod";

export const FormSchema = z.object({
    password: z.string().min(7, {
      message: "A senha deve ter pelo menos 7 caracteres.",
    }),
    confirm_password: z.string().min(7, {
      message: "A confirmação de senha deve ter pelo menos 7 caracteres.",
    }),
  });