"use client";

import Link from "next/link";
import React from "react";
import MetamaskButton from "./components/MetamaskButton";
import AccountDropdown from "./components/AccountDropdown";
import { useWeb3Store } from "@/state/web3Store";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const { isAuthenticated } = useWeb3Store();

  return (
    <Collapsible className="fixed z-50">
      <div className="flex justify-between p-4 bg-[#36517C] text-white items-center fixed w-full top-0 min-h-[62px] z-20 sm:border-b sm:border-white">
        <Link href={`/`}>
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
            ชื่ออะไรสักอย่าง
          </h2>
        </Link>
        <div className="items-center justify-end gap-x-2 text-sm sm:flex hidden">
          <div className="items-center justify-end gap-x-2 hidden sm:flex">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/lottery/buy">ซื้อสลาก</Link>
            <Link href="#ตรวจสอบสลาก">ตรวจสอบสลาก</Link>
            <div className="border-l-2 border-white h-[20px]"></div>
          </div>

          {!isAuthenticated && (
            <div>
              <MetamaskButton />
            </div>
          )}
          {isAuthenticated && (
            <div className="max-w-[120px]">
              <AccountDropdown />
            </div>
          )}
        </div>
        <div className="sm:hidden relative">
          <CollapsibleTrigger>
            <GiHamburgerMenu />
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="z-50 bg-[#36517C] w-[100vw] transition px-4 pt-[62px] flex flex-col gap-y-3 sm:hidden border-b border-white">
        <Link href="/dashboard" className="text-white">
          Dashboard
        </Link>
        <hr className="border-white" />
        <Link href="/lottery/buy" className="text-white">
          ซื้อสลาก
        </Link>
        <hr className="border-white" />
        <Link href="#ตรวจสอบสลาก" className="text-white">
          ตรวจสอบสลาก
        </Link>
        <hr className="border-white" />
        <div className="pb-5 w-full">
          {!isAuthenticated && <MetamaskButton />}
          {isAuthenticated && <AccountDropdown />}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
