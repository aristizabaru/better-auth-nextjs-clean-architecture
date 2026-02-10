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
import { signUpAction } from "@/modules/auth/presentation/actions/sign-up.action";

const formSchema = z.object({
  name: z.string().min(1, "El campo es requerido"),
  email: z
    .email("Dirección de correo electrónico no válida")
    .min(1, "El campo es requerido"),
  password: z
    .string()
    .min(8, "El campo debe tener al menos 6 caracteres")
    .max(50, "El campo no debe superar los 50 caracteres"),
});

export const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await signUpAction(data);

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
    <form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-signup-name">Nombre</FieldLabel>
              <Input
                {...field}
                id="form-signup-name"
                aria-invalid={fieldState.invalid}
                placeholder="Ingresa tu nombre"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-signup-email">
                Correo electrónico
              </FieldLabel>
              <Input
                {...field}
                id="form-signup-email"
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
              <FieldLabel htmlFor="form-signup-password">Contraseña</FieldLabel>
              <PasswordInput
                {...field}
                id="form-signup-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" form="form-signup" disabled={isSubmitting}>
            <LoadingSwap isLoading={isSubmitting}>Registrarse</LoadingSwap>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
