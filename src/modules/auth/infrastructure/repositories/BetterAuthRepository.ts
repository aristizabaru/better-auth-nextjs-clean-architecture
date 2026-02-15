import "server-only";

import { BetterAuthUser } from "../types";
import { auth } from "@/lib/auth/auth";
import {
  SignInFailedError,
  SignOutFailedError,
  SignUpFailedError,
} from "../../domain/errors";
import { AuthRepository } from "../../application/ports";
import {
  AuthenticationResult,
  SignInEmailInput,
  SignInResult,
  SignUpEmailInput,
  SignUpResult,
} from "../../application/dtos";

type SignUpEmailResponse = Awaited<ReturnType<typeof auth.api.signUpEmail>>;
type SignInEmailResponse = Awaited<ReturnType<typeof auth.api.signInEmail>>;

// infrastructure/repositories/* → operaciones tipo “gateway” (auth, db-backed things)
// infrastructure/providers/* → fuentes de datos/config
// infrastructure/services/* → acciones externas (email, payments, storage)

// Un Repository representa el mecanismo mediante el cual el dominio
// accede y persiste entidades o ejecuta operaciones que dependen
// de sistemas externos (base de datos, servicios de identidad, etc.).
// Es un puerto de salida definido en la capa de Application y
// cuya implementación concreta vive en Infrastructure.
// Permite aislar la lógica de negocio de los detalles técnicos
// de almacenamiento o integración externa.

export class BetterAuthRepository implements AuthRepository {
  private static mapUser(user: BetterAuthUser) {
    return { userId: user.id, email: user.email };
  }

  private static mapAuthResponseToResult(result: {
    token: string | null;
    user: BetterAuthUser;
  }): AuthenticationResult {
    const base = BetterAuthRepository.mapUser(result.user);
    return result.token === null
      ? { status: "PENDING_VERIFICATION", ...base }
      : { status: "SIGNED_IN", ...base };
  }

  async signUpWithEmail(input: SignUpEmailInput): Promise<SignUpResult> {
    let result: SignUpEmailResponse;

    try {
      result = await auth.api.signUpEmail({ body: input });
    } catch {
      throw new SignUpFailedError();
    }

    return BetterAuthRepository.mapAuthResponseToResult({
      token: result.token,
      user: result.user,
    });
  }

  async signInWithEmail(input: SignInEmailInput): Promise<SignInResult> {
    let result: SignInEmailResponse;

    try {
      result = await auth.api.signInEmail({ body: input });
    } catch {
      throw new SignInFailedError();
    }

    return BetterAuthRepository.mapAuthResponseToResult({
      token: result.token,
      user: result.user,
    });
  }

  async signOut(request: { headers: Headers }): Promise<void> {
    try {
      await auth.api.signOut({ headers: request.headers });
    } catch {
      throw new SignOutFailedError();
    }
  }
}
