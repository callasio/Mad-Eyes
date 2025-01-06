import { pictureUrlFromString } from "../utils/picture";
import { getUrl } from "../utils/url";
import { UserData } from "./getUser";

interface GetUserFriendsResponse {
  success: boolean;
  friends?: UserData[];
}

export async function getUserFriends(id: string): Promise<GetUserFriendsResponse> {
  const res = await fetch(getUrl("user", id, "friends"), {
    method: "GET",
  });

  if (res.status !== 200) return { success: false };
  const data = await res.json();

  return {
    success: true,
    friends: data.map((friend: any) => ({
      id: friend.id,
      email: friend.email,
      nickname: friend.nickname,
      profilePicture: friend.profilePicture
        ? pictureUrlFromString(friend.profilePicture)
        : undefined,
    })),
  };
}