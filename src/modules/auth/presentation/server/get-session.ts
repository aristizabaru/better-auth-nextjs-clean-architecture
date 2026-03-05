import "server-only";

import { makeSessionProvider } from "@/modules/auth/infrastructure/composition";

/**
 * getServerSession:
 * Helper de Presentation que obtiene la sesión vía SessionProvider,
 * sin depender del SDK ni de Next runtime APIs.
 */
async function getServerSession() {
  return makeSessionProvider().getSession();
}

export { getServerSession };
