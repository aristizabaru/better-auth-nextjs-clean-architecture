import "server-only";

import { auth } from "@/lib/auth/auth";

import type {
  AuthService,
  AuthRequestContext,
  SignInEmailInputDTO,
  SignInResultDTO,
  SignUpEmailInputDTO,
  SignUpResultDTO,
  AuthenticationResultDTO,
} from "@/modules/auth/application";

import { AuthProviderOperationFailedError } from "@/modules/auth/application";

type BetterAuthSession = typeof auth.$Infer.Session;
type BetterAuthUser = BetterAuthSession["user"];

type SignUpEmailResponse = Awaited<ReturnType<typeof auth.api.signUpEmail>>;
type SignInEmailResponse = Awaited<ReturnType<typeof auth.api.signInEmail>>;

/**
 * BetterAuthAuthService (Infrastructure Adapter):
 * Implementa el Port AuthService usando Better Auth.
 *
 * Infraestructura conoce el SDK (auth) y sus tipos/formatos.
 * Mapea respuestas externas a DTOs de Application.
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
      result = await auth.api.signUpEmail({ body: input });
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
      result = await auth.api.signInEmail({ body: input });
    } catch (cause) {
      throw new AuthProviderOperationFailedError("AUTH_SIGN_IN_FAILED", cause);
    }

    return BetterAuthAuthService.mapAuthResponseToResult({
      token: result.token,
      user: result.user,
    });
  }

  async signOut(context: AuthRequestContext): Promise<void> {
    /**
     * El contexto es opaco para Application. Aquí lo interpretamos.
     * Para Better Auth normalmente se requieren headers/cookies.
     */
    const maybeHeaders = (context as Record<string, unknown>)["headers"];

    if (!(maybeHeaders instanceof Headers)) {
      // Esto es un fallo de wiring/composición (Infra/Presentation), no del dominio.
      throw new AuthProviderOperationFailedError("AUTH_SIGN_OUT_FAILED", {
        reason: "INVALID_AUTH_CONTEXT_HEADERS",
      });
    }

    try {
      await auth.api.signOut({ headers: maybeHeaders });
    } catch (cause) {
      throw new AuthProviderOperationFailedError("AUTH_SIGN_OUT_FAILED", cause);
    }
  }
}

export { BetterAuthAuthService };
