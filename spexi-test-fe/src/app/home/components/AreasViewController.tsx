import { cookies } from "next/headers";

import { AreasView } from "./AreasView";
import { USERNAME_COOKIE_NAME } from "@/constants/cookies";
import { ScoutingArea } from "@/types/ScoutingArea";

const fetchData = async () => {
  try {
    const urlBase = process.env.API_URL;
    if (!urlBase) {
      throw new Error("Missing API URL in env config!");
    }

    const username = cookies().get(USERNAME_COOKIE_NAME);
    if (!username) {
      throw new Error("Somehow username is missing!");
    }

    const result = await fetch(urlBase + "/areas", {
      headers: {
        username: username.value,
      },
      cache: "no-store",
    });

    if (result.status !== 200) {
      throw new Error("Something went wrong!");
    }

    const parsedResult = (await result.json()) as ScoutingArea[];

    return { response: parsedResult };
  } catch (e) {
    console.log("🚀 ~ file: PostsController.tsx ~ line 52 ~ fetchData ~ e", e);
    return { error: e };
  }
};

export default async function AreasViewController() {
  const result = await fetchData();

  if (result.response) {
    return <AreasView areas={result.response} />;
  } else {
    return <div>{(result.error as Error)?.message || "Error!"}</div>;
  }
}
