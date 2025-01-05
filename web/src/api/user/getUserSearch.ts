import { pictureUrlFromString } from "../utils/picture";
import { getUrl } from "../utils/url";
import { GetUserResponse } from "./getUser";

export async function getUserSearch(
  search: string,
): Promise<GetUserResponse[]> {
  const res = await fetch(getUrl("user", search), {
    method: "GET",
  });

  if (res.status !== 200) return [];

  const data = await res.json();

  return data.map((user: any) => {
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        profilePicture: user.profilePicture
          ? pictureUrlFromString(user.profilePicture)
          : undefined,
      },
    };
  });
}
