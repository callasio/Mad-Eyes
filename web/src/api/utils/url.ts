// const URL = "http://localhost:8080";
const URL = "https://madcamp-week2-1-34386751090.asia-northeast3.run.app";

export function getUrl(...route: string[]): string {
  return `${URL}/${route.join("/")}`;
}
