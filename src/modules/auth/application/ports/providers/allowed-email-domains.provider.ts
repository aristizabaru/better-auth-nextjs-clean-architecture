interface AllowedEmailDomainsProvider {
  /**
   * Si retorna [] significa "no hay restricción" (permitir todos).
   * Si retorna ["example.com", "example.org"], se restringe a esos dominios.
   */
  getAllowedDomains(): string[];
}

export type { AllowedEmailDomainsProvider };
