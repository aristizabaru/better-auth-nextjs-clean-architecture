import {
  EmailDomainNotAllowedError,
  InvalidEmailError,
  SignInFailedError,
  SignOutFailedError,
  SignUpFailedError,
} from "../../domain/errors";

export function mapAuthErrorToMessage(e: unknown): string {
  if (e instanceof SignUpFailedError) return "Algo ha fallado en el registro.";
  if (e instanceof SignInFailedError)
    return "Algo ha fallado en el inicio de sesión.";
  if (e instanceof SignOutFailedError)
    return "Algo ha fallado al cerrar la sesión.";
  if (e instanceof InvalidEmailError) return "Correo electrónico no válido.";
  if (e instanceof EmailDomainNotAllowedError) {
    return `Solo se permiten correos de: ${e.allowedDomains.join(", ")}`;
  }

  // Opcional: log server-side para diagnóstico (no en client)
  console.error("Auth error:", e);
  return "Error inesperado. Intenta de nuevo.";
}
