import "server-only";

import {
  SignInWithEmailUseCase,
  SignOutUseCase,
  SignUpWithEmailUseCase,
  type AllowedEmailDomainsProvider,
  type AuthService,
  type RequestContextProvider,
  type SessionProvider,
} from "@/modules/auth/application";

import { EmailDomainAllowListPolicy } from "@/modules/auth/domain";

import {
  BetterAuthAuthService,
  BetterAuthSessionProvider,
  EnvAllowedEmailDomainsProvider,
  NextJsRequestContextProvider,
} from "@/modules/auth/infrastructure";

/**
 * AuthUseCases:
 * Conjunto de Casos de Uso del módulo de autenticación ya ensamblados.
 *
 * Composition Root:
 * - Único lugar donde se instancian Adapters de Infrastructure.
 * - Presentation consume Casos de Uso ya cableados.
 */
type AuthUseCases = Readonly<{
  signUpWithEmail: SignUpWithEmailUseCase;
  signInWithEmail: SignInWithEmailUseCase;
  signOut: SignOutUseCase;
}>;

/**
 * AuthPorts:
 * Dependencias concretas que implementan los Ports definidos en Application.
 */
type AuthPorts = Readonly<{
  authService: AuthService;
  allowedEmailDomainsProvider: AllowedEmailDomainsProvider;
  requestContextProvider: RequestContextProvider;
  sessionProvider: SessionProvider;
}>;

/**
 * buildAuthPorts:
 * Construye las implementaciones concretas (Adapters) de los Ports.
 *
 * Regla:
 * - Application define contratos (Ports).
 * - Infrastructure implementa esos contratos (Adapters).
 */
function buildAuthPorts(): AuthPorts {
  const authService: AuthService = new BetterAuthAuthService();

  const allowedEmailDomainsProvider: AllowedEmailDomainsProvider =
    new EnvAllowedEmailDomainsProvider();

  const requestContextProvider: RequestContextProvider =
    new NextJsRequestContextProvider();

  const sessionProvider: SessionProvider = new BetterAuthSessionProvider();

  return {
    authService,
    allowedEmailDomainsProvider,
    requestContextProvider,
    sessionProvider,
  };
}

/**
 * buildAuthDomainServices:
 * Construye servicios puros del dominio.
 */
function buildAuthDomainServices(): Readonly<{
  emailDomainAllowListPolicy: EmailDomainAllowListPolicy;
}> {
  const emailDomainAllowListPolicy = new EmailDomainAllowListPolicy();
  return { emailDomainAllowListPolicy };
}

/**
 * makeAuthUseCases:
 * Factory principal del módulo. Devuelve los Casos de Uso ensamblados.
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

  return { signUpWithEmail, signInWithEmail, signOut };
}

/**
 * Factories individuales:
 * Útiles para que Presentation consuma solo lo necesario por acción.
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

/**
 * Factories de Providers (para helpers de Presentation):
 * Permiten obtener capacidades técnicas (request context / session)
 * sin importar SDKs directamente en Presentation.
 */
function makeRequestContextProvider(): RequestContextProvider {
  return buildAuthPorts().requestContextProvider;
}

function makeSessionProvider(): SessionProvider {
  return buildAuthPorts().sessionProvider;
}

export type { AuthUseCases, AuthPorts };
export {
  makeAuthUseCases,
  makeSignUpWithEmailUseCase,
  makeSignInWithEmailUseCase,
  makeSignOutUseCase,
  makeRequestContextProvider,
  makeSessionProvider,
};
