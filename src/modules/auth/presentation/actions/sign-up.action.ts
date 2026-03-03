"use server";

import type { SignUpResultDTO } from "@/modules/auth/application";
import { makeSignUpWithEmailUseCase } from "@/modules/auth/infrastructure";

import { signUpSchema } from "../validators";
import { mapAuthErrorToMessage } from "../errors";

type SignUpActionResult =
  | { ok: true; status: SignUpResultDTO["status"] }
  | { ok: false; message: string };

async function signUpAction(input: unknown): Promise<SignUpActionResult> {
  // 1) Validación estructural (Presentation)
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Datos inválidos. Revisa el formulario." };
  }

  // 2) Caso de Uso ya ensamblado
  try {
    const useCase = makeSignUpWithEmailUseCase();
    const result = await useCase.execute(parsed.data);

    return { ok: true, status: result.status };
  } catch (e) {
    return { ok: false, message: mapAuthErrorToMessage(e) };
  }
}

export { signUpAction };
export type { SignUpActionResult };
