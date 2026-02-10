import Link from "next/link";
import { Badge, Button } from "@/shared/components";
import { routes } from "@/shared/config/routes";
import { getServerSession } from "@/modules/auth/presentation/server/get-session";
import { SignOutButton } from "@/modules/auth/presentation/components";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Proyecto X</h1>

        {session?.user ? (
          <div className="flex gap-4">
            <Badge className="select-none">{session.user.name}</Badge>
            <SignOutButton />
          </div>
        ) : (
          <Button asChild size="lg">
            <Link href={routes.auth.login}>Sign In / Sign Up</Link>
          </Button>
        )}
      </div>
    </main>
  );
}
