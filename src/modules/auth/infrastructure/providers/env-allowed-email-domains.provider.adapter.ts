import "server-only";

import { envServer } from "@/shared/config/env/env.server";
import { AllowedEmailDomains } from "@/modules/auth/domain";
import type { AllowedEmailDomainsProvider } from "@/modules/auth/application";

/**
 * EnvAllowedEmailDomainsProvider (Infrastructure Adapter):
 * Implementa AllowedEmailDomainsProvider leyendo configuración desde ENV.
 *
 * Infraestructura puede conocer env/envServer.
 * Retorna Value Object del dominio para mantener consistencia semántica.
 */
class EnvAllowedEmailDomainsProvider implements AllowedEmailDomainsProvider {
  async getAllowedDomains(): Promise<AllowedEmailDomains> {
    const raw = envServer.AUTH_ALLOWED_EMAIL_DOMAINS;

    if (!raw) return new AllowedEmailDomains([]);

    const list = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    return new AllowedEmailDomains(list);
  }
}

export { EnvAllowedEmailDomainsProvider };
