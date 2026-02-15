export type AuthenticationResult =
  | { status: "SIGNED_IN"; userId: string; email: string }
  | { status: "PENDING_VERIFICATION"; userId: string; email: string };

export type SignUpResult = AuthenticationResult;
export type SignInResult = AuthenticationResult;
