"use server";

import { headers } from "next/headers";
import { SignOutUseCase } from "@/modules/auth/application";
import { BetterAuthRepository } from "@/modules/auth/infrastructure";
import { mapAuthErrorToMessage } from "../errors";

type SignOutActionResult = { ok: true } | { ok: false; message: string };

async function signOutAction(): Promise<SignOutActionResult> {
  // 1) Ejecutar caso de uso inyectando repositorio que implementa
  // la lógica de negocio (sin detalles de infraestructura)
  try {
    const useCase = new SignOutUseCase(new BetterAuthRepository());
    await useCase.execute({ headers: await headers() });

    return { ok: true };
  } catch (e) {
    // 3) Mapping de errores del dominio a mensajes UX y retorno de respuesta
    return { ok: false, message: mapAuthErrorToMessage(e) };
  }
}

export { signOutAction };
