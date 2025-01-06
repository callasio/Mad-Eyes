import { Session } from "next-auth";
import { getUrl } from "../utils/url";

export async function postFriendAccept(id: string, session: Session): Promise<{
  status: "exists" | "success" | "not_found" | "error";
}> {
  const res = await fetch(getUrl('friend', 'accept', id), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  });

  if (res.status !== 200) return { status: "error" };

  const data = await res.json();
  return data;
}