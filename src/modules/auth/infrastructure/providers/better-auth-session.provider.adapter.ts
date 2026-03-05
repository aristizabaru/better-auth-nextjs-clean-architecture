import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import type { SessionDTO, SessionProvider } from "@/modules/auth/application";

/**
 * BetterAuthSessionProvider (Infrastructure Adapter):
 * Implementa SessionProvider usando Better Auth.
 *
 * Importante:
 * - Better Auth requiere `headers` para leer la sesión actual en server-side.
 */
class BetterAuthSessionProvider implements SessionProvider {
  async getSession(): Promise<SessionDTO | null> {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) return null;

    return {
      userId: session.user.id,
      email: session.user.email,
      name: session.user.name,
    };
  }
}

export { BetterAuthSessionProvider };
