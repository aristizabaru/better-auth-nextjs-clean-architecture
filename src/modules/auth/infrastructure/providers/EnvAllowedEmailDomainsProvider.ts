import "server-only";

import { envServer } from "@/shared/config/env/env.server";
import { AllowedEmailDomainsProvider } from "../../application/ports";

// infrastructure/repositories/* → operaciones tipo “gateway” (auth, db-backed things)
// infrastructure/providers/* → fuentes de datos/config
// infrastructure/services/* → acciones externas (email, payments, storage)

// Un Provider representa una fuente externa de datos auxiliares
// que el dominio necesita para tomar decisiones.
// No modela entidades del negocio, sino información de apoyo
// (configuración, feature flags, valores dinámicos, etc.).
// Se define como un puerto en Application y su implementación
// concreta vive en Infrastructure, manteniendo al dominio
// independiente del origen real de esos datos.

export class EnvAllowedEmailDomainsProvider implements AllowedEmailDomainsProvider {
  getAllowedDomains(): string[] {
    const raw = envServer.AUTH_ALLOWED_EMAIL_DOMAINS;

    if (!raw) return [];

    return raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }
}
