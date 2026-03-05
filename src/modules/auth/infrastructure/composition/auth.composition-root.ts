import "server-only";

import {
  SignInWithEmailUseCase,
  SignOutUseCase,
  SignUpWithEmailUseCase,
  type AllowedEmailDomainsProvider,
  type AuthService,
  type SessionProvider,
} from "@/modules/auth/application";

import { EmailDomainAllowListPolicy } from "@/modules/auth/domain";

import {
  BetterAuthAuthService,
  BetterAuthSessionProvider,
  EnvAllowedEmailDomainsProvider,
} from "@/modules/auth/infrastructure";

/**
 * AuthUseCases:
 * Casos de uso del módulo auth ensamblados mediante Composition Root.
 */
type AuthUseCases = Readonly<{
  signUpWithEmail: SignUpWithEmailUseCase;
  signInWithEmail: SignInWithEmailUseCase;
  signOut: SignOutUseCase;
}>;

type AuthPorts = Readonly<{
  authService: AuthService;
  allowedEmailDomainsProvider: AllowedEmailDomainsProvider;
  sessionProvider: SessionProvider;
}>;

function buildAuthPorts(): AuthPorts {
  const allowedEmailDomainsProvider: AllowedEmailDomainsProvider =
    new EnvAllowedEmailDomainsProvider();

  const sessionProvider: SessionProvider = new BetterAuthSessionProvider();

  const authService: AuthService = new BetterAuthAuthService();

  return { authService, allowedEmailDomainsProvider, sessionProvider };
}

function buildAuthDomainServices(): Readonly<{
  emailDomainAllowListPolicy: EmailDomainAllowListPolicy;
}> {
  const emailDomainAllowListPolicy = new EmailDomainAllowListPolicy();
  return { emailDomainAllowListPolicy };
}

function makeAuthUseCases(): AuthUseCases {
  const { authService, allowedEmailDomainsProvider } = buildAuthPorts();
  const { emailDomainAllowListPolicy } = buildAuthDomainServices();

  const signUpWithEmail = new SignUpWithEmailUseCase(
    authService,
    allowedEmailDomainsProvider,
    emailDomainAllowListPolicy,
  );

  const signInWithEmail = new SignInWithEmailUseCase(authService);

  const signOut = new SignOutUseCase(authService);

  return { signUpWithEmail, signInWithEmail, signOut };
}

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
 * Factory de Provider (para helpers de Presentation):
 * Presentation puede consumir SessionProvider sin importar el SDK.
 */
function makeSessionProvider(): SessionProvider {
  return buildAuthPorts().sessionProvider;
}

export type { AuthUseCases, AuthPorts };
export {
  makeAuthUseCases,
  makeSignUpWithEmailUseCase,
  makeSignInWithEmailUseCase,
  makeSignOutUseCase,
  makeSessionProvider,
};
