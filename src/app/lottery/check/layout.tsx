import React from 'react'

type Props = {}

export default function CheckLotteryLayout({children}: {children: React.ReactNode;}) {
  return (
    <div className="bg-white min-h-[100dvh] px-5 py-14 sm:p-14">{children}</div>
  )
}