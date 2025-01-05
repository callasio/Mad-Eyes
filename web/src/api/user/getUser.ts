import { Session } from "next-auth";
import { getUrl } from "../utils/url";
import { pictureUrlFromString } from "../utils/picture";

export interface UserData {
  id: string;
  email: string;
  nickname: string;
  profilePicture?: string;
}

export interface GetUserResponse {
  success: boolean;
  user?: UserData;
}

export async function getUser(session: Session): Promise<GetUserResponse> {
  const res = await fetch(getUrl("user"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  });

  if (res.status !== 200) return { success: false };
  const data = await res.json();

  if (data.registered)
    return {
      success: true,
      user: {
        id: data.id,
        email: data.email,
        nickname: data.nickname,
        profilePicture: data.profilePicture
          ? pictureUrlFromString(data.profilePicture)
          : undefined,
      },
    };

  return { success: true };
}
