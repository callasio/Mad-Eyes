import { getUrl } from "../utils/url";

export async function getBlinkFromUserId(id: string): Promise<any> {
  const res = await fetch(getUrl('blinks', id), {
    method: "GET",
  });

  if (res.status !== 200) return null;

  const data = await res.json();

  return data;
}
/*
{
  (start_time): [first_minute_count, second_minute_count, ...],
  (start_time): [first_minute_count, second_minute_count, ...],
  ...
}
*/