import { SignUpFailedError } from "@/modules/auth/domain/errors/SignUpFailedError";
import { SignInFailedError } from "@/modules/auth/domain/errors/SignInFailedError";
import { SignOutFailedError } from "@/modules/auth/domain/errors/SignOutFailedError";

export function mapAuthErrorToMessage(e: unknown): string {
  if (e instanceof SignUpFailedError) return "Algo ha fallado en el registro.";
  if (e instanceof SignInFailedError)
    return "Algo ha fallado en el inicio de sesión.";
  if (e instanceof SignOutFailedError)
    return "Algo ha fallado al cerrar la sesión.";

  // Opcional: log server-side para diagnóstico (no en client)
  console.error("Auth error:", e);
  return "Error inesperado. Intenta de nuevo.";
}
