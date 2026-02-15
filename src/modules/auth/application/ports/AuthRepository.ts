import {
  SignInEmailInput,
  SignInResult,
  SignUpEmailInput,
  SignUpResult,
} from "../dtos";

export interface AuthRepository {
  signUpWithEmail(input: SignUpEmailInput): Promise<SignUpResult>;
  signInWithEmail(input: SignInEmailInput): Promise<SignInResult>;
  signOut(request: { headers: Headers }): Promise<void>;
}
