import { Session } from "next-auth";
import { getUrl } from "../utils/url";

export async function deleteFriend(id: string, session: Session): Promise<{
  status: "success" | "not_found" | "error";
}> {
  const res = await fetch(getUrl('friend', id), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  });
  if (res.status !== 200) return { status: "error" };
  const data = await res.json();
  return data;
}