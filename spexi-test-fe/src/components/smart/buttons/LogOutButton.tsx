"use client";

import { logOut } from "@/actions/logOut";
import { Button } from "@/components/ui/button";

export const LogOutButton = () => {
  return (
    <Button
      onClick={() => logOut()}
      variant="outline"
      className="pointer-events-auto"
    >
      {"Log Out"}
    </Button>
  );
};
