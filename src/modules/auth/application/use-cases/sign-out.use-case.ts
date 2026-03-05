import type { AuthService } from "../ports";

/**
 * SignOutUseCase:
 * Orquesta el cierre de sesión (reglas del proceso).
 *
 * Nota:
 * - Application no conoce cookies/headers.
 * - El SDK/Infrastructure resuelve el detalle técnico.
 */
class SignOutUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(): Promise<void> {
    return this.authService.signOut();
  }
}

export { SignOutUseCase };
