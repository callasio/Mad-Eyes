import { pictureUrlFromString } from "../utils/picture";
import { getUrl } from "../utils/url";

interface GetUserFriendsResponse {
  success: boolean;
  friends?: {
    id: string;
    nickname: string;
    profilePicture?: string;
  }[];
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
      nickname: friend.nickname,
      profilePicture: friend.profilePicture
        ? pictureUrlFromString(friend.profilePicture)
        : undefined,
    })),
  };
}