type AuthenticationResultDTO =
  | { status: "SIGNED_IN"; userId: string; email: string }
  | { status: "PENDING_VERIFICATION"; userId: string; email: string };

type SignUpResultDTO = AuthenticationResultDTO;
type SignInResultDTO = AuthenticationResultDTO;

export type { AuthenticationResultDTO, SignUpResultDTO, SignInResultDTO };
