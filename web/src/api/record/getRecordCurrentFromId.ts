import { getUrl } from "../utils/url";

export interface RecordCurrent {
  start: string;
  duration: number;
  online: boolean;
}

export async function getRecordCurrentFromId(id: string): Promise<{
  status: "success" | "error", record?: RecordCurrent
}> {
  const res = await fetch(getUrl('record', 'current', id), {
    method: "GET",
  });

  if (res.status !== 200) return {
    status: "error"
  };

  const data = await res.json();

  return data;
}