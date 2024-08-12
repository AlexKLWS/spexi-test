import { cookies } from "next/headers";

import { AreasView } from "./AreasView";
import { USERNAME_COOKIE_NAME } from "@/constants/cookies";

const fetchData = async () => {
  try {
    // const urlBase = process.env.API_URL;
    // if (!urlBase) {
    //   throw new Error("Missing API URL in env config!");
    // }

    const username = cookies().get(USERNAME_COOKIE_NAME);
    if (!username) {
      throw new Error("Somehow username is missing!");
    }

    // const result = await fetch(urlBase + "/postings", {
    //   headers: {
    //     username: username.value,
    //   },
    //   cache: "no-store",
    // });

    // const parsedResult = (await result.json()) as Posting[];

    const lol = [
      {
        id: 1,
        title: "Downtown",
        reward: 2,
        description: null,
        hash: "8928308289ffff",
        latitude: 49.283832198,
        longitude: -123.119332856,
        isBookmarked: false,
      },
      {
        id: 2,
        title: "Stanley Park",
        reward: 5,
        description: "A beautiful park with lots of greenery and wildlife.",
        hash: "a9b5c7d8e9f0123",
        latitude: 49.304302,
        longitude: -123.144228,
        isBookmarked: true,
      },
      {
        id: 3,
        title: "Granville Island",
        reward: 4,
        description: "A vibrant market area with shops and eateries.",
        hash: "bcf798ab123cdef",
        latitude: 49.271416,
        longitude: -123.134269,
        isBookmarked: false,
      },
      {
        id: 4,
        title: "Kitsilano Beach",
        reward: 3,
        description: "A popular beach with stunning views of the city.",
        hash: "d47e9f0123a8bcf",
        latitude: 49.273426,
        longitude: -123.155074,
        isBookmarked: null,
      },
      {
        id: 5,
        title: "Queen Elizabeth Park",
        reward: 4,
        description: "A beautiful park with gardens and views of Vancouver.",
        hash: "f0123a8bcde9f45",
        latitude: 49.241679,
        longitude: -123.112317,
        isBookmarked: true,
      },
    ];

    return { response: lol };
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
