"use server";

import {
  SignInResultDTO,
  SignInWithEmailUseCase,
} from "@/modules/auth/application";
import { BetterAuthRepository } from "@/modules/auth/infrastructure";
import { signInSchema } from "../validators";
import { mapAuthErrorToMessage } from "../errors";

type SignInActionResult =
  | { ok: true; status: SignInResultDTO["status"] }
  | { ok: false; message: string };

async function signInAction(input: unknown): Promise<SignInActionResult> {
  // 1) Validación server-side (seguro)
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Datos inválidos. Revisa el formulario." };
  }
  // 2) Inyectando repositorio (adaptador) que implementa
  // el puerto hacia el proveedor de autenticación
  try {
    const useCase = new SignInWithEmailUseCase(new BetterAuthRepository());
    const result = await useCase.execute(parsed.data);

    return { ok: true, status: result.status };
  } catch (e) {
    // 3) Mapping de errores del dominio a mensajes UX y retorno de respuesta
    return { ok: false, message: mapAuthErrorToMessage(e) };
  }
}

export { signInAction };
