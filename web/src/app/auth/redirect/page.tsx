"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Redirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams?.get("code");
    if (code) {
      window.location.href = "madeyes://auth/callback?code=" + code;
    }
  }, [router, searchParams]);

  return <p>Redirecting...</p>;
}
