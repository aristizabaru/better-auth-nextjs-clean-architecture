import { SignUpFailedError } from "@/modules/auth/domain/errors/SignUpFailedError";

export function mapAuthErrorToMessage(e: unknown): string {
  if (e instanceof SignUpFailedError) return "Algo ha fallado en el registro.";

  // Opcional: log server-side para diagnóstico (no en client)
  console.error("Auth error:", e);
  return "Error inesperado. Intenta de nuevo.";
}
