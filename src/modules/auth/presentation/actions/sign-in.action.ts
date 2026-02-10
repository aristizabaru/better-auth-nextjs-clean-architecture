"use server";

import { signInSchema } from "../validators/sign-in.schema";
import { BetterAuthRepository } from "../../infrastructure/repositories/BetterAuthRepository";
import { mapAuthErrorToMessage } from "../errors/error-mapper";
import { SignInResult } from "../../application/dtos/AuthFlowResult";
import { SignInWithEmail } from "../../application/use-cases/SignInWithEmail";

export type SignInActionResult =
  | { ok: true; status: SignInResult["status"] }
  | { ok: false; message: string };

export async function signInAction(
  input: unknown,
): Promise<SignInActionResult> {
  // 1) Validación server-side (seguro)
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Datos inválidos. Revisa el formulario." };
  }

  // 2) Ejecutar caso de uso inyectando repositorio que implementa
  // la lógica de negocio (sin detalles de infraestructura)
  try {
    const useCase = new SignInWithEmail(new BetterAuthRepository());
    const result = await useCase.execute(parsed.data);

    return { ok: true, status: result.status };
  } catch (e) {
    // 3) Mapping de errores del dominio a mensajes UX y retorno de respuesta
    return { ok: false, message: mapAuthErrorToMessage(e) };
  }
}
