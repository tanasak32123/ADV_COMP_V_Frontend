"use client";

import Link from "next/link";
import React from "react";
import MetamaskButton from "./components/MetamaskButton";
import AccountDropdown from "./components/AccountDropdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { GiHamburgerMenu } from "react-icons/gi";
import { TWeb3Store, useWeb3Store } from "@/state/web3Store";
import useStore from "@/hooks/useStore";
import Image from "next/image";
import Logo from '@/app/favicon.ico';
// import useDealer from "@/hooks/useDealer";

export default function Navbar() {
  const {data: isAuthenticated, loading} = useStore<TWeb3Store, boolean>(useWeb3Store, (state) => state.isAuthenticated);

  // const { dealer, isDealer, loading: dealerLoading } = useDealer();

  return (
    <Collapsible className="fixed z-50">
      <div className="flex justify-between p-4 bg-[#36517C] text-white items-center fixed w-full top-0 min-h-[62px] z-20 sm:border-b sm:border-white">
        <Link href={`/`} className="flex justify-center items-center gap-x-1">
          <Image src={Logo} width={30} height={30} alt="Lottery Logo" priority />
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
            ชื่ออะไรสักอย่าง
          </h2>
        </Link>
        <div className="items-center justify-end gap-x-2 text-sm sm:flex hidden">
          {!loading && !isAuthenticated && (
            <div>
              <MetamaskButton />
            </div>
          )}
          {!loading && isAuthenticated && (
            <React.Fragment>
              <div className="items-center justify-end gap-x-2 hidden sm:flex">
                <Link href="/dashboard">dashboard</Link>
                <Link href="/lottery/buy">ซื้อสลาก</Link>
                <Link href="/lottery/check">ตรวจสอบสลาก</Link>
                <div className="border-l-2 border-white h-[20px]"></div>
              </div>
              <div className="max-w-[120px]">
                <AccountDropdown />
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="sm:hidden relative">
          <CollapsibleTrigger>
            <GiHamburgerMenu />
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="z-50 bg-[#36517C] w-[100vw] transition px-4 pt-[62px] flex flex-col gap-y-3 sm:hidden border-b border-white">
        {!loading && isAuthenticated && (
          <React.Fragment>
            <Link href="/dashboard" className="text-white">
              dashboard
            </Link>
            <hr className="border-white" />
            <Link href="/lottery/buy" className="text-white">
              ซื้อสลาก
            </Link>
            <hr className="border-white" />
            <Link href="/lottery/check" className="text-white">
              ตรวจสอบสลาก
            </Link>
            <hr className="border-white" />
          </React.Fragment>
        )}
        <div className="pb-5 w-full">
          {!loading && !isAuthenticated && <MetamaskButton />}
          {!loading && isAuthenticated && <AccountDropdown />}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
