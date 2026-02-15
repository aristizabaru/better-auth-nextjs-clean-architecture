import { Email } from "../../domain/value-objects";
import { SignInEmailInput, SignInResult } from "../dtos";
import { AuthRepository } from "../ports";

// Los casos de uso representan las acciones que el sistema puede realizar.
// Son la capa donde se implementa la lógica de negocio específica de cada acción,
// utilizando los Value Objects y las Entidades del dominio, y comunicándose
// con los repositorios a través de los puertos.
// Representan reglas del proceso (lógicas) que dependen del
// “qué estoy haciendo”y que pueden variar

export class SignInWithEmail {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(input: SignInEmailInput): Promise<SignInResult> {
    // Creación del Value Object
    const email = new Email(input.email);

    // Aquí viven las reglas de negocio. Son reglas que dependen solo del “qué estoy haciendo”,
    // Reglas que siempre deben cumplirse sin importar el caso de uso
    // van en Value Objects (y a veces Entidades).

    // Reglas caso de uso:
    // Ejm: Validar el formato del email antes de llamar al repositorio.

    // Volvemos al DTO para el port (porque el port sigue siendo string-based)
    return this.authRepo.signInWithEmail({
      ...input,
      email: email.value,
    });
  }
}
