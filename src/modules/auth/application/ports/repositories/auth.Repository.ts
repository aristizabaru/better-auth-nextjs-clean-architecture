import {
  SignInEmailInputDTO,
  SignInResultDTO,
  SignUpEmailInputDTO,
  SignUpResultDTO,
} from "../../dtos";

interface AuthRepository {
  signUpWithEmail(input: SignUpEmailInputDTO): Promise<SignUpResultDTO>;
  signInWithEmail(input: SignInEmailInputDTO): Promise<SignInResultDTO>;
  signOut(request: { headers: Headers }): Promise<void>;
}

export type { AuthRepository };
