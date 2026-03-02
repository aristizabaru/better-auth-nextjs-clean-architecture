"use server";

import { EmailDomainPolicy } from "@/modules/auth/domain";
import {
  SignUpResultDTO,
  SignUpWithEmailUseCase,
} from "@/modules/auth/application";
import {
  BetterAuthRepository,
  EnvAllowedEmailDomainsProvider,
} from "@/modules/auth/infrastructure";
import { signUpSchema } from "../validators";
import { mapAuthErrorToMessage } from "../errors";

type SignUpActionResult =
  | { ok: true; status: SignUpResultDTO["status"] }
  | { ok: false; message: string };

async function signUpAction(input: unknown): Promise<SignUpActionResult> {
  // 1) Validación server-side (seguro)
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Datos inválidos. Revisa el formulario." };
  }

  // 2) Inyectando repositorio (adaptador) que implementa
  // el puerto hacia el proveedor de autenticación
  try {
    const useCase = new SignUpWithEmailUseCase(
      new BetterAuthRepository(),
      new EnvAllowedEmailDomainsProvider(),
      new EmailDomainPolicy(),
    );
    const result = await useCase.execute(parsed.data);

    return { ok: true, status: result.status };
  } catch (e) {
    // 3) Mapping de errores del dominio a mensajes UX y retorno de respuesta
    return { ok: false, message: mapAuthErrorToMessage(e) };
  }
}

export { signUpAction };
