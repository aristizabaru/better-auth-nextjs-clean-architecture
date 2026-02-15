import { AuthRepository } from "../ports";

export class SignOut {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(request: { headers: Headers }): Promise<void> {
    // Aquí viven las reglas de negocio. Son reglas que dependen solo del “qué estoy haciendo”,
    // Reglas que siempre deben cumplirse sin importar el caso de uso
    // van en Value Objects (y a veces Entidades).

    // Reglas caso de uso:
    // Ejm: Validar que el usuario esté autenticado antes de cerrar sesión.

    return this.authRepo.signOut(request);
  }
}
