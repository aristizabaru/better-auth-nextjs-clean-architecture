import "server-only";

import { auth } from "@/lib/auth/auth";
import type {
  AuthRequestContext,
  SessionDTO,
  SessionProvider,
} from "@/modules/auth/application";

/**
 * BetterAuthSessionProvider (Infrastructure Adapter):
 * Implementa SessionProvider usando Better Auth.
 *
 * Infraestructura conoce el SDK y cómo interpretar el contexto (headers/cookies).
 */
class BetterAuthSessionProvider implements SessionProvider {
  async getSession(context: AuthRequestContext): Promise<SessionDTO | null> {
    const maybeHeaders = (context as Record<string, unknown>)["headers"];

    if (!(maybeHeaders instanceof Headers)) {
      // Contexto inválido => wiring incorrecto o ejecución en entorno inesperado.
      return null;
    }

    const session = await auth.api.getSession({ headers: maybeHeaders });

    if (!session?.user) return null;

    return {
      userId: session.user.id,
      email: session.user.email,
    };
  }
}

export { BetterAuthSessionProvider };
