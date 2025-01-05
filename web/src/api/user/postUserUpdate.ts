import { Session } from "next-auth";
import { getUrl } from "../utils/url";

interface PostUserUpdateResponse {
  status: "success" | "nonexistent" | "error";
}

export async function postUserUpdate(
  nickname: string,
  profilePicture: string,
  session: Session,
) {
  const formData = new FormData();
  formData.append("nickname", nickname);
  if (profilePicture) {
    const response = await fetch(profilePicture);
    const blob = await response.blob();
    formData.append("profilePicture", blob);
  }

  const res = await fetch(getUrl("user", "update"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
    body: formData,
  });

  if (res.status !== 200) return { status: "error" };

  const data = await res.json();

  return data as PostUserUpdateResponse;
}