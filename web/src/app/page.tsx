"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/mainContents";
import Header from "@/components/Header";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (session.expires && new Date(session.expires) < new Date()) {
        signIn("google");
        return;
      }

      const userEmail = session.user?.email || "unknown@example.com";
  
      const mockDatabase: { [key: string]: boolean } = {
        "munkonggpt@gmail.com": false,  // 이미 가입된 사용자
        "navygrace8389@gmail.com": true, // 신규 사용자
      };
  
      const isUserSignedUp = mockDatabase[userEmail] || false;
      if (isUserSignedUp) {
        router.push("/dashboard"); 
      } else {
        router.push("/signup");
      }
    }
  }, [session]);
  

  return (
    <>
      <Header/>
      <MainContent/>
    </>
  );
}
