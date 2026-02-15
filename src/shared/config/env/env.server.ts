import "server-only";

import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL es requerida"),
  BETTER_AUTH_URL: z.url({ protocol: /^https?(?::\/\/?|)$/ }), // Con http opcional para pruebas locales
  BETTER_AUTH_TRUSTED_ORIGINS: z
    .string()
    .min(1, "BETTER_AUTH_TRUSTED_ORIGINS es requerida"),
  AUTH_ALLOWED_EMAIL_DOMAINS: z.string(),
});

export const envServer = (() => {
  const parsed = serverSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("⨯ Variables de entorno inválidas (server):");
    console.error(z.prettifyError(parsed.error));

    throw new Error("Variables de entorno inválidas (server)");
  }

  return parsed.data;
})();
