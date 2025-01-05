import { pictureUrlFromString } from "../utils/picture";
import { getUrl } from "../utils/url";
import { GetUserResponse } from "./getUser";

export async function getUserFromId(id: string): Promise<GetUserResponse> {
  const res = await fetch(getUrl('user', id), {
    method: 'GET',
  });

  if (res.status !== 200) return { success: false };
  const data = await res.json();

  return {
    success: true,
    user: {
      id: data.id,
      email: data.email,
      nickname: data.nickname,
      profilePicture: data.profilePicture ?
        pictureUrlFromString(data.profilePicture) : undefined,
    }
  };
}