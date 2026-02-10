import Link from "next/link";
import { Badge, Button } from "@/shared/components";
import { routes } from "@/shared/config/routes";
import { getServerSession } from "@/modules/auth/presentation/server/get-session";

export async function Welcome() {
  const session = await getServerSession();

  return (
    <>
      <h1 className="mb-3 text-3xl font-bold">Proyecto X</h1>

      {session?.user ? (
        <Badge className="select-none">{session.user.name}</Badge>
      ) : (
        <Button asChild size="lg">
          <Link href={routes.auth.login}>Sign In / Sign Up</Link>
        </Button>
      )}
    </>
  );
}
