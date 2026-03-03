import "server-only";

import {
  makeRequestContextProvider,
  makeSessionProvider,
} from "@/modules/auth/infrastructure/composition/auth.composition-root";

/**
 * getServerSession (Presentation Server Helper):
 * Helper para obtener la sesión actual sin depender del SDK de autenticación.
 *
 * Flujo:
 * - Presentation pide contexto al RequestContextProvider (Infrastructure).
 * - Presentation pide sesión al SessionProvider (Infrastructure).
 *
 * Presentation decide el formato de consumo (UI), pero no conoce Better Auth.
 */
async function getServerSession() {
  const requestContextProvider = makeRequestContextProvider();
  const context = await requestContextProvider.getAuthContext();

  const sessionProvider = makeSessionProvider();
  return sessionProvider.getSession(context);
}

export { getServerSession };
