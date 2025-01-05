import { Session } from "next-auth";
import { getUrl } from "../constants/url";

interface PostUserRegisterResponse {
  status: "existing" | "success" | "error";
}

export async function postUserRegister(nickname: string, profilePicture: Blob | null, session: Session): Promise<PostUserRegisterResponse> {
  const res = await fetch(getUrl('user', 'register'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
    body: JSON.stringify({ nickname, profilePicture }),
  });

  if (res.status !== 200) return { status: "error" };
  const data = await res.json();

  return data as PostUserRegisterResponse;
}
