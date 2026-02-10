"use client";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  LoadingSwap,
  PasswordInput,
} from "@/shared/components";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/config/routes";
import { signInAction } from "@/modules/auth/presentation/actions/sign-in.action";

const formSchema = z.object({
  email: z
    .email("Dirección de correo electrónico no válida")
    .min(1, "El campo es requerido"),
  password: z
    .string()
    .min(8, "El campo debe tener al menos 8 caracteres")
    .max(50, "El campo no debe superar los 50 caracteres"),
});

export const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await signInAction(data);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    if (res.status === "PENDING_VERIFICATION") {
      router.push(routes.auth.verify);
      return;
    }

    router.push(routes.public.home);
  }

  return (
    <form id="form-signin" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-signin-email">
                Correo electrónico
              </FieldLabel>
              <Input
                {...field}
                id="form-signin-email"
                aria-invalid={fieldState.invalid}
                placeholder="Ingresa tu correo electrónico"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-signin-password">Contraseña</FieldLabel>
              <PasswordInput
                {...field}
                id="form-signin-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" form="form-signin" disabled={isSubmitting}>
            <LoadingSwap isLoading={isSubmitting}>Ingresar</LoadingSwap>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
