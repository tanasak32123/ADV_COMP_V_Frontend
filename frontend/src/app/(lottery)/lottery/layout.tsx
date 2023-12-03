import React from "react";

export default function BuyTicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-5 py-14 sm:p-14">{children}</div>;
}
