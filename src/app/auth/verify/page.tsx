import Link from "next/link";
import { routes } from "@/shared/config/routes";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components";

export default function VerifyEmailPage() {
  return (
    <main className="mx-auto my-10 max-w-md px-4">
      <Card>
        <CardHeader>
          <CardTitle>Revisa tu correo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Te enviamos un enlace de verificación. Abre tu correo y haz clic en
            el enlace para activar tu cuenta.
          </p>

          <div className="flex gap-2">
            <Button asChild>
              <Link href={routes.auth.login}>Volver a login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
