import { getUrl } from "../utils/url";

export async function getActiveFromUserId(id: string): Promise<boolean | null> {
  const res = await fetch(getUrl("active", id), {
    method: "GET",
  });

  if (res.status !== 200) return null;

  const data = await res.json();

  return data;
}