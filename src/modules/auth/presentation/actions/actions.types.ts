import type {
  SignInResultDTO,
  SignUpResultDTO,
} from "@/modules/auth/application";

/**
 * SignInActionResult:
 * Resultado orientado a UX. Presentation decide el formato de retorno
 * para el canal (Server Actions).
 */
type SignInActionResult =
  | { ok: true; status: SignInResultDTO["status"] }
  | { ok: false; message: string };

/**
 * SignUpActionResult:
 * Resultado orientado a UX. Presentation decide el formato de retorno
 * para el canal (Server Actions).
 */
type SignUpActionResult =
  | { ok: true; status: SignUpResultDTO["status"] }
  | { ok: false; message: string };

type SignOutActionResult = { ok: true } | { ok: false; message: string };

export type { SignInActionResult, SignUpActionResult, SignOutActionResult };
