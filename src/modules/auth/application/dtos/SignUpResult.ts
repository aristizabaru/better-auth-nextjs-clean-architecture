export type SignUpResult =
  | {
      /** Usuario creado y autenticado inmediatamente */
      status: "SIGNED_IN" | "PENDING_VERIFICATION";
      userId: string;
      email: string;
    }
  | {
      /** Usuario creado pero debe verificar email antes de autenticarse */
      status: "PENDING_VERIFICATION";
      userId: string;
      email: string;
    };
