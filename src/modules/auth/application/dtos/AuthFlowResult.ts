export type AuthFlowResult =
  | { status: "SIGNED_IN"; userId: string; email: string }
  | { status: "PENDING_VERIFICATION"; userId: string; email: string };

export type SignUpResult = AuthFlowResult;
export type SignInResult = AuthFlowResult;
