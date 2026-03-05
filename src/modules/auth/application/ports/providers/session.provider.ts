import type { SessionDTO } from "../../dtos";

/**
 * SessionProvider (Port - Provider):
 * Lectura de sesión actual.
 *
 * Nota:
 * - Infrastructure obtiene los headers/cookies necesarios para el SDK.
 */
interface SessionProvider {
  getSession(): Promise<SessionDTO | null>;
}

export type { SessionProvider };
