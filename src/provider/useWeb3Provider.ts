import { useWeb3Store } from "@/state/web3Store";
import { ethers } from "ethers";
import React from "react";

const useWeb3Provider = () => {
  const {
    setWallet,
    disconnect,
    changeAccount,
    changeNetwork,
    isAuthenticated,
  } = useWeb3Store();

  const connectWallet = React.useCallback(async () => {
    if (isAuthenticated) return;

    const ethereum = window.ethereum;

    if (!ethereum) return console.log("Metamask not detected.");

    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const accounts: string[] = await provider.send("eth_requestAccounts", []);

      if (accounts.length <= 0) return console.log("Account not detected.");

      const signer = await provider.getSigner();
      const chain = Number(await (await provider.getNetwork()).chainId);

      setWallet({
        address: accounts[0],
        signer,
        currentChain: chain,
        provider,
        isAuthenticated: true,
      });

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("address", accounts[0]);
    } catch (error: unknown) {
      console.log(error);
      console.log("Error connecting ...");
    }
  }, [isAuthenticated, setWallet]);

  const disconnectWallet = React.useCallback(() => {
    disconnect();
    localStorage.removeItem("address");
    localStorage.removeItem("isAuthenticated");
  }, [disconnect]);

  React.useEffect(() => {
    if (window === null) return;
    if (localStorage.hasOwnProperty("isAuthenticated")) connectWallet();
  }, [connectWallet, setWallet]);

  React.useEffect(() => {
    if (typeof window.ethereum === "undefined") return;

    window.ethereum.on("accountsChanged", (accounts) => {
      if (!Array.isArray(accounts)) return;
      if (
        accounts.length > 0 &&
        accounts.every((value) => typeof value === "string")
      )
        changeAccount(accounts[0] as string);
    });

    window.ethereum.on("chainChanged", (network) => {
      if (typeof network !== "string") return;
      changeNetwork(Number(network));
    });
  }, [changeAccount, changeNetwork]);

  return {
    connectWallet,
    disconnectWallet,
  };
};

export default useWeb3Provider;
