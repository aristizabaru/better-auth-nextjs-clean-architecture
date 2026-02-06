"use server";

import { signUpSchema } from "../validators/sign-up.schema";
import { BetterAuthRepository } from "../../infrastructure/repositories/BetterAuthRepository";
import { SignUpWithEmail } from "../../application/use-cases/SignUpWithEmail";
import { mapAuthErrorToMessage } from "../errors/error-mapper";
import { SignUpResult } from "../../application/dtos/SignUpResult";

export type SignUpActionResult =
  | { ok: true; status: SignUpResult["status"] }
  | { ok: false; message: string };

export async function signUpAction(
  input: unknown,
): Promise<SignUpActionResult> {
  // 1) Validación server-side (seguro)
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Datos inválidos. Revisa el formulario." };
  }

  // 2) Ejecutar caso de uso
  try {
    const useCase = new SignUpWithEmail(new BetterAuthRepository());
    const result = await useCase.execute(parsed.data);

    return { ok: true, status: result.status };
  } catch (e) {
    // 3) Mapping de errores del dominio a mensajes UX y retorno de respuesta
    return { ok: false, message: mapAuthErrorToMessage(e) };
  }
}
