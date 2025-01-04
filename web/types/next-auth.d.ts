import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string; // Add the accessToken property to Session
    idToken: string; // Add the idToken property to Session
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string; // Add the accessToken property to JWT
    idToken: string;
  }
}