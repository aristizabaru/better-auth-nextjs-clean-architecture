import "server-only";

import {
  SignInWithEmailUseCase,
  SignOutUseCase,
  SignUpWithEmailUseCase,
  type AllowedEmailDomainsProvider,
  type AuthService,
  type RequestContextProvider,
} from "@/modules/auth/application";

import { EmailDomainAllowListPolicy } from "@/modules/auth/domain";

import {
  BetterAuthAuthService,
  EnvAllowedEmailDomainsProvider,
  NextJsRequestContextProvider,
} from "@/modules/auth/infrastructure";

/**
 * AuthUseCases:
 * Conjunto de Casos de Uso del módulo de autenticación ya ensamblados
 * (cableados con sus dependencias concretas).
 *
 * Nota académica:
 * - Esto es Composition Root (wiring): el único lugar donde se crean
 *   implementaciones concretas de Infrastructure y se inyectan en Application.
 * - Presentation debe consumir estos casos de uso sin conocer Better Auth,
 *   env, headers/cookies, ni otros detalles técnicos.
 */
type AuthUseCases = Readonly<{
  signUpWithEmail: SignUpWithEmailUseCase;
  signInWithEmail: SignInWithEmailUseCase;
  signOut: SignOutUseCase;
}>;

/**
 * buildAuthPorts:
 * Construye las dependencias concretas (Ports) del módulo.
 *
 * Regla:
 * - Application define los contratos.
 * - Infrastructure provee las implementaciones (Adapters).
 *
 * Aquí se materializa la inversión de dependencias.
 */
function buildAuthPorts(): Readonly<{
  authService: AuthService;
  allowedEmailDomainsProvider: AllowedEmailDomainsProvider;
  requestContextProvider: RequestContextProvider;
}> {
  const authService: AuthService = new BetterAuthAuthService();
  const allowedEmailDomainsProvider: AllowedEmailDomainsProvider =
    new EnvAllowedEmailDomainsProvider();
  const requestContextProvider: RequestContextProvider =
    new NextJsRequestContextProvider();

  return { authService, allowedEmailDomainsProvider, requestContextProvider };
}

/**
 * buildAuthDomainServices:
 * Construye servicios puros del dominio.
 *
 * Nota:
 * Los Domain Services no dependen de infraestructura. Pueden instanciarse
 * libremente aquí o incluso ser singletons si se justifica (al ser puros).
 */
function buildAuthDomainServices(): Readonly<{
  emailDomainAllowListPolicy: EmailDomainAllowListPolicy;
}> {
  const emailDomainAllowListPolicy = new EmailDomainAllowListPolicy();
  return { emailDomainAllowListPolicy };
}

/**
 * makeAuthUseCases:
 * Factory principal del módulo. Devuelve los Casos de Uso
 * completamente ensamblados.
 *
 * En Next.js, este wiring puede ejecutarse por-request (Server Action)
 * sin problema, ya que:
 * - los Adapters suelen ser livianos
 * - y los Providers request-scoped (como RequestContextProvider)
 *   obtienen el contexto en el momento de ejecución.
 */
function makeAuthUseCases(): AuthUseCases {
  const { authService, allowedEmailDomainsProvider, requestContextProvider } =
    buildAuthPorts();

  const { emailDomainAllowListPolicy } = buildAuthDomainServices();

  const signUpWithEmail = new SignUpWithEmailUseCase(
    authService,
    allowedEmailDomainsProvider,
    emailDomainAllowListPolicy,
  );

  const signInWithEmail = new SignInWithEmailUseCase(authService);

  const signOut = new SignOutUseCase(authService, requestContextProvider);

  return {
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };
}

/**
 * Factories individuales (opcional):
 * Útiles si Presentation prefiere importar una sola factory por acción
 * en lugar de un contenedor completo.
 */
function makeSignUpWithEmailUseCase(): SignUpWithEmailUseCase {
  return makeAuthUseCases().signUpWithEmail;
}

function makeSignInWithEmailUseCase(): SignInWithEmailUseCase {
  return makeAuthUseCases().signInWithEmail;
}

function makeSignOutUseCase(): SignOutUseCase {
  return makeAuthUseCases().signOut;
}

export type { AuthUseCases };
export {
  makeAuthUseCases,
  makeSignUpWithEmailUseCase,
  makeSignInWithEmailUseCase,
  makeSignOutUseCase,
};
