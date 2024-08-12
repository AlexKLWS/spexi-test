import { Suspense } from "react";
import { cookies } from "next/headers";

import { LogOutButton } from "@/components/smart/buttons/LogOutButton";
import AreasViewController from "./components/AreasViewController";
import { USERNAME_COOKIE_NAME } from "@/constants/cookies";
import { ListLoader } from "./components/ListLoader";

export default function Component() {
  const username = cookies().get(USERNAME_COOKIE_NAME);

  return (
    <div className="w-full h-screen">
      <div className="pt-8 px-8 flex items-center justify-end w-full z-10 absolute top-0 left-0 right-0">
        <div className="text-black text-lg mr-8">{`Hi ${username?.value}!`}</div>
        <LogOutButton />
      </div>
      <Suspense fallback={<ListLoader />}>
        <AreasViewController />
      </Suspense>
    </div>
  );
}
