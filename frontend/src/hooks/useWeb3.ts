import useLotteryContract from "@/hooks/useLotteryContract";
import { useWeb3Store } from "@/state/web3Store";
import { ethers } from "ethers";
import React from "react";

const useWeb3 = () => {
  const {
    setWallet,
    disconnect,
    // changeAccount,
    changeNetwork,
    isAuthenticated,
  } = useWeb3Store();

  const [loading, setLoading] = React.useState(false);

  const connectWallet = React.useCallback(async () => {
    setLoading(true);
    console.log("Connecting wallet ...");
    const ethereum = window.ethereum;
    if (!ethereum) return console.log("Metamask not detected.");
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const accounts: string[] = await provider.send("eth_requestAccounts", []);

      if (accounts.length <= 0) return console.log("Account not detected.");

      const signer = await provider.getSigner();
      const chain = Number(await (await provider.getNetwork()).chainId);

      // const dealerAddress = await getDealer();

      setWallet({
        address: accounts[0],
        signer,
        currentChain: chain,
        provider,
        isAuthenticated: true,
      });
    } catch (error: unknown) {
      const message =
        error && typeof error === "object" && "message" in error
          ? error.message
          : "Something went wrong";
      console.log("Error connect wallet:", message);
    } finally {
      setLoading(false);
    }
  }, [setWallet]);

  const myBalance = React.useCallback(async () => {
    setLoading(true);
    const ethereum = window.ethereum;
    if (!ethereum) return console.log("Metamask not detected.");
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const accounts: string[] = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(accounts[0]);
      return balance;
    } catch (err: unknown) {
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnectWallet = React.useCallback(() => {
    disconnect();
    localStorage.removeItem("isCheckDealerIsPop");
  }, [disconnect]);

  React.useEffect(() => {
    if (window === null) return;
    if (isAuthenticated) connectWallet();
  }, [connectWallet, isAuthenticated, setWallet]);

  React.useEffect(() => {
    if (typeof window.ethereum === "undefined") return;

    window.ethereum.on("accountsChanged", (accounts) => {
      if (!Array.isArray(accounts)) return;
      if (
        accounts.length > 0 &&
        accounts.every((value) => typeof value === "string")
      )
        connectWallet();
      localStorage.removeItem("isCheckDealerIsPop");
    });

    window.ethereum.on("chainChanged", (network) => {
      if (typeof network !== "string") return;
      changeNetwork(Number(network));
    });
  }, [changeNetwork, connectWallet]);

  return {
    connectWallet,
    disconnectWallet,
    loading,
    isAuthenticated,
    myBalance,
  };
};

export default useWeb3;
