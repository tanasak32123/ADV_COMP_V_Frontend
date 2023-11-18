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
    <Collapsible>
      <div className="flex justify-between p-4 bg-[#36517C] text-white items-center fixed w-full top-0 min-h-[62px] z-20 px-10">
        <Link href={`/`}>
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
            ชื่ออะไรสักอย่าง
          </h2>
        </Link>
        <div className="items-center justify-end gap-x-2 text-sm sm:flex hidden">
          <div className="items-center justify-end gap-x-2 hidden sm:flex">
            <Link href="#dashboard">Dashboard</Link>
            <Link href="#ซื้อสลาก">ซื้อสลาก</Link>
            <Link href="#ตรวจสอบสลาก">ตรวจสอบสลาก</Link>
            <div className="border-l-2 border-white h-[20px]"></div>
          </div>

          {!isAuthenticated && <MetamaskButton />}
          {isAuthenticated && <AccountDropdown />}
        </div>
        <div className="sm:hidden relative">
          <CollapsibleTrigger>
            <GiHamburgerMenu />
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="z-50 bg-white w-[100vw] px-10 pt-[62px]">
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  );
}
