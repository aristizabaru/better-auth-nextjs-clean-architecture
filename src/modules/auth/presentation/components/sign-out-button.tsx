"use client";

import { signOutAction } from "@/modules/auth/presentation/actions/sign-out.action";
import { Button } from "@/shared/components"; // o donde exportes Button
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/config/routes";

export const SignOutButton = () => {
  const router = useRouter();

  const onSignOut = async () => {
    const res = await signOutAction();

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    router.push(routes.public.home);
    router.refresh();
  };

  return (
    <Button size="xs" variant="ghost" onClick={onSignOut}>
      Sign Out
    </Button>
  );
};
