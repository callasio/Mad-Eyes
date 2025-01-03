export async function startWebcam(): Promise<MediaStream> {
  return await navigator.mediaDevices.getUserMedia({ video: true });
}