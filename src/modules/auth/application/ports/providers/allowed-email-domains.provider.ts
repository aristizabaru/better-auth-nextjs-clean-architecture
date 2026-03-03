import type { AllowedEmailDomains } from "@/modules/auth/domain";

/**
 * AllowedEmailDomainsProvider (Port - Provider):
 * Provee la allowlist de dominios permitidos para registro.
 *
 * Regla semántica:
 * - Si la lista está vacía => no hay restricción (permitir todos).
 *
 * Nota: retorna un Value Object del dominio para evitar duplicar
 * normalización/validación y mantener consistencia semántica.
 */
interface AllowedEmailDomainsProvider {
  getAllowedDomains(): Promise<AllowedEmailDomains>;
}

export type { AllowedEmailDomainsProvider };
