import type { AuthRequestContext } from "./request-context.provider";

/**
 * SessionProvider (Port - Provider):
 * Abstrae la lectura de la sesión actual desde el mecanismo de autenticación,
 * sin acoplar Application/Presentation a un SDK o framework.
 *
 * Nota:
 * - Es un Provider porque representa una capacidad técnica transversal.
 * - El contexto de autenticación es opaco para Application.
 */
type SessionDTO = Readonly<{
  userId: string;
  email: string;
}>;

interface SessionProvider {
  getSession(context: AuthRequestContext): Promise<SessionDTO | null>;
}

export type { SessionDTO, SessionProvider };
