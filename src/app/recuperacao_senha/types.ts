import { z } from "zod";
import { FormSchema } from "./schema";

export type TypeFormSchema = z.infer<typeof FormSchema>;