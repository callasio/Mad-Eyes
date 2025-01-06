import { Session } from "next-auth";
import { getUrl } from "../utils/url";

export async function postActive(session: Session): Promise<{
  status: "success" | "error";
}> {
  const res = await fetch(getUrl("active"), {
    method: "POST",
    headers: {
      
      Authorization: `Bearer ${session?.idToken}`,
    },
  });

  if (res.status !== 200) return { status: "error" };

  const data = await res.json();
  return data;
}
