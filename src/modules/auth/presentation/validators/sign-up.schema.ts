import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "El campo es requerido"),
  email: z
    .email("Dirección de correo electrónico no válida")
    .min(1, "El campo es requerido"),
  password: z
    .string()
    .min(8, "El campo debe tener al menos 8 caracteres")
    .max(50, "El campo no debe superar los 50 caracteres"),
});

export type SignUpDTO = z.infer<typeof signUpSchema>;
