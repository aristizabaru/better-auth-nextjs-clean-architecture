import { AuthRepository } from "../ports";

class SignOutUseCase {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(request: { headers: Headers }): Promise<void> {
    // Reglas caso de uso:
    // Ejm: Validar que el usuario esté autenticado antes de cerrar sesión.

    return this.authRepo.signOut(request);
  }
}

export { SignOutUseCase };
