"use client";

import { Button } from "@/components/ui/button";
import useWeb3 from "@/hooks/useWeb3";
import { useRouter } from "next/navigation";
import React from "react";

export default function MetamaskButton() {
  const router = useRouter();
  const { connectWallet } = useWeb3();

  const onConnectedWallet = async () => {
    await connectWallet();
    router.replace("/");
  }
  
  return <Button onClick={onConnectedWallet} className="bg-[#36517C] border-white border-[1px] rounded-[40px] h-fit py-1 px-2 w-full">Connect</Button>;
}
