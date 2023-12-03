'use client';

import { Button } from "@/components/ui/button";
import useStore from "@/hooks/useStore";
import useWeb3Provider from "@/provider/useWeb3Provider";
import { TWeb3Store, useWeb3Store } from "@/state/web3Store";
import { useRouter } from "next/navigation";
import React from "react";

export default function GetStartedBtn() {
  const { data: isAuthenticated } = useStore<TWeb3Store, boolean>(
    useWeb3Store,
    (state) => state.isAuthenticated
  );
  const { connectWallet } = useWeb3Provider();
  const router = useRouter();

  const clickGetStartedBtn = async () => {
    if (!isAuthenticated) {
      await connectWallet();
    }
    router.push("/dashboard");
  };

  return (
    <Button className="bg-[#618FD8] font-bold mt-4 rounded-[25px] min-w-[120px]" onClick={clickGetStartedBtn}>
      Get Start
    </Button>
  );
}
