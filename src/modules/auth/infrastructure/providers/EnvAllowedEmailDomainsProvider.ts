import "server-only";

import { envServer } from "@/shared/config/env/env.server";
import { AllowedEmailDomainsProvider } from "@/modules/auth/application";

class EnvAllowedEmailDomainsProvider implements AllowedEmailDomainsProvider {
  getAllowedDomains(): string[] {
    const raw = envServer.AUTH_ALLOWED_EMAIL_DOMAINS;

    if (!raw) return [];

    return raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }
}

export { EnvAllowedEmailDomainsProvider };
