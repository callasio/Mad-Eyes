const URL = "http://localhost:8080";

export function getUrl(...route: string[]): string {
  return `${URL}/${route.join("/")}`;
}
