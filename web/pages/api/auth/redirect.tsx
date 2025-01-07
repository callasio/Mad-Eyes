import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  const router = useRouter();

  // useEffect(() => {
  //   const { code } = router.query;
  //   if (code) {
  //     window.location.href = "madeyes://auth/callback?code=" + code;
  //   }
  // }, [router]);

  return <p>Redirecting...</p>;
}
