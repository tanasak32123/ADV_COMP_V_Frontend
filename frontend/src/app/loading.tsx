import React from "react";

type Props = {
  className?: string;
};

export default function Loading({ className = "text-white" }: Props) {
  // Or a custom loading skeleton component
  return (
    <div className="h-[85dvh] flex justify-center items-center">
      <div className={`${className} text-lg font-bold`}>Loading...</div>
    </div>
  );
}
