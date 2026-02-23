import { Email } from "../../domain/value-objects";
import { SignInEmailInput, SignInResult } from "../dtos";
import { AuthRepository } from "../ports";

// Un Caso de Uso representa una acción específica que el sistema
// puede ejecutar desde la perspectiva del negocio.
//
// Orquesta el flujo de un proceso: recibe datos de entrada (DTOs),
// crea y utiliza Value Objects y Entidades del dominio,
// aplica políticas o servicios del dominio cuando es necesario,
// y se comunica con repositorios o servicios externos
// a través de puertos definidos en Application.
//
// Contiene reglas del proceso (qué debe ocurrir en esta acción),
// pero no contiene detalles técnicos ni implementaciones concretas.
//
// Actúa como coordinador entre Presentation, Domain
// e Infrastructure, manteniendo las dependencias dirigidas
// hacia el dominio.
//
// El Caso de Uso decide "cuándo" aplicar reglas;
// el dominio define "cómo" se comportan esas reglas.

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
