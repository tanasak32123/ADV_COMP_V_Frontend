"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-[85dvh] flex justify-center items-center">
      <div className="text-center">
        <div className="text-orange-500 text-3xl font-bold mb-3">404 Not Found</div>
        <Button onClick={() => router.replace("/")}>Home Page</Button>
      </div>
    </div>
  );
}
