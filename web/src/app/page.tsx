"use client";

import MainContent from "@/components/mainContents";
import Header from "@/components/Header";
import { useAuth } from "@/auth/AuthProvider";
import { useState, useTransition } from "react";

export default function Home() {
  const { loading } = useAuth();
  const [isPending, _] = useTransition();

  return (
    <>
      <Header />
      {loading || isPending ? <div>Loading...</div> :
        <MainContent />}
    </>
  );
}
