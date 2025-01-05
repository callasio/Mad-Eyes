import { Session } from "next-auth";
import { getUrl } from "../utils/url";

interface PostUserUnregisterResponse {
  status: "nonexistent" | "success" | "error";
}

export async function postUserUnregister(
  session: Session,
): Promise<PostUserUnregisterResponse> {
  const res = await fetch(getUrl("user", "unregister"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  });

  if (res.status !== 200) return { status: "error" };
  const data = await res.json();

  return data as PostUserUnregisterResponse;
}
