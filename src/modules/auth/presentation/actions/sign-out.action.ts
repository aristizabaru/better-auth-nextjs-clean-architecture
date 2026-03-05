"use server";

import { makeSignOutUseCase } from "@/modules/auth/infrastructure";
import { mapAuthErrorToMessage } from "../errors";
import { SignOutActionResult } from "./actions.types";

async function signOutAction(): Promise<SignOutActionResult> {
  // 1) Caso de Uso ya ensamblado
  try {
    const useCase = makeSignOutUseCase();

    // Application no conoce headers/cookies. El contexto lo obtiene el Provider en Infra.
    await useCase.execute();

    return { ok: true };
  } catch (e) {
    return { ok: false, message: mapAuthErrorToMessage(e) };
  }
}

export { signOutAction };
