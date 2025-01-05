import { Session } from "next-auth";
import { getUrl } from "../constants/url";

export interface UserData {
  email: string;
  nickname: string;
  profilePicture: string;
}

interface GetUserResponse {
  success: boolean;
  user?: UserData;
}

export async function getUser(session: Session): Promise<GetUserResponse> {
  const res = await fetch(getUrl('user'), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    }
  })
  
  if (res.status !== 200) return { success: false };
  const data = await res.json();

  if (data.registered)
    return { 
      success: true,
        user: {
        email: data.email,
        nickname: data.nickname,
        profilePicture: data.profilePicture,
      }};
  
  return { success: true };
}