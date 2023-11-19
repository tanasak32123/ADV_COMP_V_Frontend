import React from "react";

type Props = {};

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="h-[90dvh] flex justify-center items-center">
      <div className="text-white text-lg font-bold">Loading...</div>
    </div>
  );
}
