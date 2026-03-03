import { DomainError } from "@/modules/auth/domain";
import { ApplicationError } from "@/modules/auth/application";
import type { EmailDomainNotAllowedError } from "@/modules/auth/domain";

/**
 * mapAuthErrorToMessage:
 * Traduce errores semánticos (Domain) y de proceso/integración (Application)
 * a mensajes adecuados para UX.
 */
function mapAuthErrorToMessage(e: unknown): string {
  if (e instanceof DomainError) {
    switch (e.code) {
      case "INVALID_EMAIL":
        return "Correo electrónico no válido.";

      case "EMAIL_DOMAIN_NOT_ALLOWED": {
        const err = e as unknown as EmailDomainNotAllowedError;
        return `Solo se permiten correos de: ${err.allowedDomains.join(", ")}`;
      }

      case "INVALID_EMAIL_DOMAIN":
        return "Dominio de correo no válido.";

      default:
        return "Error de validación del dominio.";
    }
  }

  if (e instanceof ApplicationError) {
    switch (e.code) {
      case "AUTH_SIGN_UP_FAILED":
        return "Algo ha fallado en el registro.";

      case "AUTH_SIGN_IN_FAILED":
        return "Algo ha fallado en el inicio de sesión.";

      case "AUTH_SIGN_OUT_FAILED":
        return "Algo ha fallado al cerrar la sesión.";

      default:
        return "No fue posible completar la operación. Intenta de nuevo.";
    }
  }

  console.error("Auth error (unknown):", e);
  return "Error inesperado. Intenta de nuevo.";
}

export { mapAuthErrorToMessage };
