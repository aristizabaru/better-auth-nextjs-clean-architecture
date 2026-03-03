import type { AuthService, RequestContextProvider } from "../ports";

/**
 * SignOutUseCase:
 * Orquesta el cierre de sesión (reglas del proceso).
 *
 * Nota:
 * - Application no conoce HTTP/cookies/headers.
 * - Obtiene un contexto opaco mediante RequestContextProvider,
 *   y lo entrega a AuthService (integración externa).
 */
class SignOutUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly requestContextProvider: RequestContextProvider,
  ) {}

  async execute(): Promise<void> {
    const context = await this.requestContextProvider.getAuthContext();
    return this.authService.signOut(context);
  }
}

export { SignOutUseCase };
