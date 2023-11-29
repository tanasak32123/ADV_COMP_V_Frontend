"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="h-[85dvh] flex justify-center items-center">
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-3">404 Unauthorized</div>
        <Button onClick={() => router.replace("/")}>Home Page</Button>
      </div>
    </div>
  );
}
