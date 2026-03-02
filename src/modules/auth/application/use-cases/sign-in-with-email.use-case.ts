import { Email } from "@/modules/auth/domain";
import { SignInEmailInputDTO, SignInResultDTO } from "../dtos";
import { AuthRepository } from "../ports";

class SignInWithEmailUseCase {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(input: SignInEmailInputDTO): Promise<SignInResultDTO> {
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

export { SignInWithEmailUseCase };
