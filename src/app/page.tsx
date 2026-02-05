import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/components";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto my-6 max-w-md px-4">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold">Bienvenido a Proyecto X</h1>
        <Button asChild size="lg">
          <Link href={routes.auth.login}>Sign In / Sign Up</Link>
        </Button>
      </div>
    </main>
  );
}
