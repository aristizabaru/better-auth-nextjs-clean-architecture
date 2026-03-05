import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

import type {
  AuthService,
  SignInEmailInputDTO,
  SignInResultDTO,
  SignUpEmailInputDTO,
  SignUpResultDTO,
  AuthenticationResultDTO,
} from "@/modules/auth/application";

import {
  BetterAuthUser,
  SignInEmailResponse,
  SignUpEmailResponse,
} from "./services.types";

import { AuthProviderOperationFailedError } from "@/modules/auth/application";

/**
 * BetterAuthAuthService (Infrastructure Adapter):
 * Implementa AuthService usando Better Auth.
 *
 * Importante:
 * - Este SDK requiere `headers` en sus llamadas (error: "Headers is required").
 * - `headers()` es un detalle técnico del runtime de Next.js, por lo tanto
 *   se resuelve aquí (Infrastructure) y no en Application.
 */
class BetterAuthAuthService implements AuthService {
  private static mapUser(user: BetterAuthUser) {
    return { userId: user.id, email: user.email };
  }

  private static mapAuthResponseToResult(result: {
    token: string | null;
    user: BetterAuthUser;
  }): AuthenticationResultDTO {
    const base = BetterAuthAuthService.mapUser(result.user);

    return result.token === null
      ? { status: "PENDING_VERIFICATION", ...base }
      : { status: "SIGNED_IN", ...base };
  }

  async signUpWithEmail(input: SignUpEmailInputDTO): Promise<SignUpResultDTO> {
    let result: SignUpEmailResponse;

    try {
      result = await auth.api.signUpEmail({
        body: input,
        headers: await headers(),
      });
    } catch (cause) {
      throw new AuthProviderOperationFailedError("AUTH_SIGN_UP_FAILED", cause);
    }

    return BetterAuthAuthService.mapAuthResponseToResult({
      token: result.token,
      user: result.user,
    });
  }

  async signInWithEmail(input: SignInEmailInputDTO): Promise<SignInResultDTO> {
    let result: SignInEmailResponse;

    try {
      result = await auth.api.signInEmail({
        body: input,
        headers: await headers(),
      });
    } catch (cause) {
      throw new AuthProviderOperationFailedError("AUTH_SIGN_IN_FAILED", cause);
    }

    return BetterAuthAuthService.mapAuthResponseToResult({
      token: result.token,
      user: result.user,
    });
  }

  async signOut(): Promise<void> {
    try {
      await auth.api.signOut({
        headers: await headers(),
      });
    } catch (cause) {
      throw new AuthProviderOperationFailedError("AUTH_SIGN_OUT_FAILED", cause);
    }
  }
}

export { BetterAuthAuthService };
