import { z } from "zod";

const clientSchema = z.object({
  // Solo variables NEXT_PUBLIC_*
  NEXT_PUBLIC_BETTER_AUTH_URL: z.url({ protocol: /^https$/ }),
});

export const envClient = (() => {
  const parsed = clientSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("⨯ Variables de entorno inválidas (client):");
    console.error(z.prettifyError(parsed.error));

    throw new Error("Variables de entorno inválidas (client)");
  }

  return parsed.data;
})();
