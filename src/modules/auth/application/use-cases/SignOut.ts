import type { AuthRepository } from "../ports/AuthRepository";

export class SignOut {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(request: { headers: Headers }): Promise<void> {
    // Aquí vivirían reglas de negocio futuras:

    return this.authRepo.signOut(request);
  }
}
