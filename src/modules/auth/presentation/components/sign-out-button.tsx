"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signOutAction } from "../actions";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/components";

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
