"use client";

import MainContent from "@/components/mainContents";
import Header from "@/components/Header";
import { useAuth } from "@/auth/AuthProvider";
import { useState, useTransition } from "react";
import LoadingEyeProgress from "@/components/LoadingEyeProgress"; // Add this import

export default function Home() {
  const { loading } = useAuth();

  return (
    <>
      {loading ? (
        <LoadingEyeProgress />
      ) : (
        <div
          style={{
            height: "100vh",
            overflow: "visible",
          }}
        >
          <Header />
          <MainContent />
        </div>
      )}
    </>
  );
}
