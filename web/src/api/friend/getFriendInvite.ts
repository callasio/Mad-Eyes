import { Session } from "next-auth";
import { UserData } from "../user/getUser";
import { getUrl } from "../utils/url";
import { pictureUrlFromString } from "../utils/picture";

export async function getFriendInvite(session: Session): Promise<UserData[]> {
  const res = await fetch(getUrl('friend', 'invite'), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  });

  const data = await res.json();

  return data.map((user: any) => {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      profilePicture: user.profilePicture ?
        pictureUrlFromString(user.profilePicture) : undefined,
    };
  });
}