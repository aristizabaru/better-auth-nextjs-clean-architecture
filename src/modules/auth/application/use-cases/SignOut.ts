import { AuthRepository } from "../ports";

// Los casos de uso representan las acciones que el sistema puede realizar.
// Son la capa donde se implementa la lógica de negocio específica de cada acción,
// utilizando los Value Objects y las Entidades del dominio, y comunicándose
// con los repositorios a través de los puertos.
// Representan reglas del proceso (lógicas) que dependen del
// “qué estoy haciendo”y que pueden variar

export class SignOut {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(request: { headers: Headers }): Promise<void> {
    // Reglas caso de uso:
    // Ejm: Validar que el usuario esté autenticado antes de cerrar sesión.

    return this.authRepo.signOut(request);
  }
}
