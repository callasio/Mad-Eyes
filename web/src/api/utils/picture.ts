export function pictureUrlFromString(pictureString: string): string {
  const byteCharacters = atob(pictureString);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray]);
  return URL.createObjectURL(blob);
}
