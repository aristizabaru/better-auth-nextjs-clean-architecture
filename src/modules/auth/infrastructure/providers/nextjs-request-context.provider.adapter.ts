import "server-only";

import { headers } from "next/headers";
import type {
  AuthRequestContext,
  RequestContextProvider,
} from "@/modules/auth/application";

/**
 * NextJsRequestContextProvider (Infrastructure Adapter):
 * Provee un contexto de autenticación basado en runtime Next.js.
 *
 * Application recibe un objeto opaco (AuthRequestContext),
 * sin conocer Headers/HTTP.
 */
class NextJsRequestContextProvider implements RequestContextProvider {
  async getAuthContext(): Promise<AuthRequestContext> {
    // Next.js headers() retorna un Headers-like; Better Auth suele aceptar Headers.
    const h = headers();

    // Contexto opaco: Infrastructure y AuthService sabrán interpretarlo
    return {
      headers: h,
    } satisfies AuthRequestContext;
  }
}

export { NextJsRequestContextProvider };
