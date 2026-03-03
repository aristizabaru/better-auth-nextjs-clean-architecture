/**
 * RequestContextProvider (Port - Provider):
 * Provee el contexto de ejecución necesario para que Infrastructure
 * interactúe con el mecanismo de autenticación (cookies/headers/session),
 * sin que Application dependa de HTTP, Next.js ni tipos del runtime.
 *
 * La forma del "context" es opaca para Application: solo la transporta.
 */
type AuthRequestContext = Readonly<Record<string, unknown>>;

interface RequestContextProvider {
  getAuthContext(): Promise<AuthRequestContext>;
}

export type { AuthRequestContext, RequestContextProvider };
