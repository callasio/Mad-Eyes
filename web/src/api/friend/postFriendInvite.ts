import { Session } from "next-auth";
import { getUrl } from "../utils/url";

export async function postFriendInvite(id: string, session: Session): Promise<{
  status: "exists" | "success" | "error";
}> {
  const res = await fetch(getUrl('friend', 'invite', id), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  });

  if (res.status !== 200) return { status: "error" };

  const data = await res.json();
  return data;
}