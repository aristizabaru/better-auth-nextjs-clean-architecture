import { Email } from "../../domain/value-objects";
import { SignUpEmailInput, SignUpResult } from "../dtos";
import { AuthRepository } from "../ports";

export class SignUpWithEmail {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(input: SignUpEmailInput): Promise<SignUpResult> {
    // Creación del Value Object
    const email = new Email(input.email);

    // Aquí viven las reglas de negocio. Son reglas que dependen solo del “qué estoy haciendo”,
    // Reglas que siempre deben cumplirse sin importar el caso de uso
    // van en Value Objects (y a veces Entidades).

    // Reglas caso de uso:
    // Ejm: Validar el formato del email antes de llamar al repositorio.
    // Ejm: El email ya existe en el sistema, etc.

    // Volvemos al DTO para el port (porque el port sigue siendo string-based)
    return this.authRepo.signUpWithEmail({
      ...input,
      email: email.value,
    });
  }
}
