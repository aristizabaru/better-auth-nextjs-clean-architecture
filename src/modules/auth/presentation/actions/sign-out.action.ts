"use server";

import { BetterAuthRepository } from "../../infrastructure/repositories/BetterAuthRepository";
import { mapAuthErrorToMessage } from "../errors/error-mapper";
import { SignOut } from "../../application/use-cases/SignOut";
import { headers } from "next/headers";

export type SignOutActionResult = { ok: true } | { ok: false; message: string };

export async function signOutAction(): Promise<SignOutActionResult> {
  // 1) Ejecutar caso de uso inyectando repositorio que implementa
  // la lógica de negocio (sin detalles de infraestructura)
  try {
    const useCase = new SignOut(new BetterAuthRepository());
    await useCase.execute({ headers: await headers() });

    return { ok: true };
  } catch (e) {
    // 3) Mapping de errores del dominio a mensajes UX y retorno de respuesta
    return { ok: false, message: mapAuthErrorToMessage(e) };
  }
}
