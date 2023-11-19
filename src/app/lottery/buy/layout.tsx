import React from "react";

export default function BuyTicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-white min-h-[90dvh] p-14">{children}</div>;
}
