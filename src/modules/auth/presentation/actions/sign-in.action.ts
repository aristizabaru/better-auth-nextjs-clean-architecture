"use server";

import type { SignInResultDTO } from "@/modules/auth/application";
import { makeSignInWithEmailUseCase } from "@/modules/auth/infrastructure";

import { signInSchema } from "../validators";
import { mapAuthErrorToMessage } from "../errors";

/**
 * SignInActionResult:
 * Resultado orientado a UX. Presentation decide el formato de retorno
 * para el canal (Server Actions).
 */
type SignInActionResult =
  | { ok: true; status: SignInResultDTO["status"] }
  | { ok: false; message: string };

async function signInAction(input: unknown): Promise<SignInActionResult> {
  // 1) Validación estructural (Presentation)
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Datos inválidos. Revisa el formulario." };
  }

  // 2) Caso de Uso ya ensamblado (Composition Root en Infrastructure)
  try {
    const useCase = makeSignInWithEmailUseCase();
    const result = await useCase.execute(parsed.data);

    return { ok: true, status: result.status };
  } catch (e) {
    // 3) Error Mapping (Presentation)
    return { ok: false, message: mapAuthErrorToMessage(e) };
  }
}

export { signInAction };
export type { SignInActionResult };
