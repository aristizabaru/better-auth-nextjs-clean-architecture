import "server-only";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

async function getServerSession() {
  // Better Auth requiere headers para leer cookies de sesión en server-side
  return auth.api.getSession({
    headers: await headers(),
  });
}

export { getServerSession };
