import ABI from "@/data/abi/Lottery.json";
import React from "react";
import { ethers, BrowserProvider, JsonRpcSigner } from "ethers";
import { TWeb3Store, useWeb3Store } from "@/state/web3Store";
import useStore from "./useStore";
import { IBuyLottery } from "@/interface/lottery/buy_lottery.interface";

const CONTRACT_ADDRESS = "0x0680274ad07b3778CF8aD91389F8E6d958a80B1B";

const useLotteryContract = () => {
  const [loading, setLoading] = React.useState(false);

  const { data: signer } = useStore<TWeb3Store, JsonRpcSigner>(useWeb3Store, (state) => state.signer);

  const getDealer = React.useCallback(async () => {
    setLoading(true);
    const { ethereum } = window;
    if (!ethereum) return;
    try {
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const dealer = await contract.getDealer() as string;
      return dealer;
    } catch (err: unknown) {
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addDealer = React.useCallback(async () => {
    setLoading(true);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      await contract.addDealer({ value: 50 });
      return true;
    } catch (err: unknown) {
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [signer]);

  const buyLotteries = React.useCallback(async (lotteries: IBuyLottery,  value: number) => {
    setLoading(true);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      await contract.buyLotteries(lotteries, { value });
      return true;
    } catch (err: unknown) {
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [signer]); 

  return {
    getDealer,
    addDealer,
    buyLotteries,
    loading,
  };
};

export default useLotteryContract;
