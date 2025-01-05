import { Session } from "next-auth";
import { getUrl } from "../constants/url";

export interface UserData {
  email: string;
  nickname: string;
  profilePicture?: string;
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

  const profilePictureString = data.profilePicture;
  let url = undefined;

  if (profilePictureString) {
    const byteCharacters = atob(profilePictureString);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray]);
    url = URL.createObjectURL(blob);
  }

  if (data.registered)
    return { 
      success: true,
        user: {
        email: data.email,
        nickname: data.nickname,
        profilePicture: url,
      }};
  
  return { success: true };
}