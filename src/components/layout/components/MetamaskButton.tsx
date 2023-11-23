"use client";

import { Button } from "@/components/ui/button";
import useWeb3Provider from "@/provider/useWeb3Provider";
import React from "react";

export default function MetamaskButton() {
  const { connectWallet } = useWeb3Provider();
  
  return <Button onClick={connectWallet} className="bg-[#36517C] border-white border-[1px] rounded-[40px] h-fit py-1 px-2 w-full">Connect</Button>;
}
