"use client";

import { Button } from "@/components/ui/button";
import useWeb3Provider from "@/provider/useWeb3Provider";
import { useRouter } from "next/navigation";
import React from "react";

export default function MetamaskButton() {
  const { connectWallet } = useWeb3Provider();
  const router = useRouter();

  const onConnectedWallet = async () => {
    await connectWallet();
    router.replace("/");
  }
  
  return <Button onClick={onConnectedWallet} className="bg-[#36517C] border-white border-[1px] rounded-[40px] h-fit py-1 px-2 w-full">Connect</Button>;
}
