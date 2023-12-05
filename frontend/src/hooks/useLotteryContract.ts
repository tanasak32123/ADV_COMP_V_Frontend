import ABI from "@/data/abi/Lottery.json";
import React from "react";
import { ethers, BrowserProvider, JsonRpcSigner } from "ethers";
import { TWeb3Store, useWeb3Store } from "@/state/web3Store";
import useStore from "./useStore";
import { IRewardLottery } from "@/interface/lottery/lottery.interface";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

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
      console.log(dealer);
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
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const transaction = await contract.addDealer({ value: 5000000000000000 });
      setLoading(true);
      await transaction.wait();
      return {result: true, message: "success"};
    } catch (err: unknown) {
      const message =
        (err && typeof err === "object" && "code" in err && err.code) ||
        "Something went wrong!";
      console.log(message);
      return {result: false , message};
    } finally {
      setLoading(false);
    }
  }, [signer]);

  const buyLotteries = React.useCallback(async (data: any[][],  value: number) => {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const transaction = await contract.buyLotteries(data, {value, gasLimit: 3000000});
      setLoading(true);
      await transaction.wait();
    } catch (err: unknown) {
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [signer]);

  const chooseDealer = React.useCallback(async () => {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const transaction = await contract.chooseDealer();
      setLoading(true);
      await transaction.wait();
    } catch (err: unknown) {
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [signer]); 

  const myLotteries = React.useCallback(async () => {
    setLoading(true);
    const { ethereum } = window;
    if (!ethereum) return;
    try{
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const lotteries = await contract.getInformation();
      return lotteries.baitsData;
    }catch (err:unknown){
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
    }finally{
      setLoading(false);
    }
  },[])

  const myReward = React.useCallback(async () => {
    setLoading(true);
    const { ethereum } = window;
    if (!ethereum) return;
    try {
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const lotteries = await contract.getLastInformation();
      return lotteries.totalReward;
    } catch (err:unknown) {
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
    }finally{
      setLoading(false);
    }
  },[])

  const imDealer = React.useCallback(async () => {
    setLoading(true);
    const ethereum  = window.ethereum;
    if (!ethereum) return;
    try {
      const provider = new BrowserProvider(ethereum);
      const accounts: string[] = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const im_dealer = await contract.isDealerCandidate(accounts[0]);
      return im_dealer
    } catch (err:unknown) {
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
    }finally {
      setLoading(false);
    }
  },[])

  const myLastLotteries = React.useCallback(async () => {
    setLoading(true);
    const { ethereum } = window;
    if (!ethereum) return;
    try{
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const lotteries = await contract.getLastInformation();
      return lotteries.baitsData;
    }catch (err:unknown){
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
    }finally{
      setLoading(false);
    }
  },[])

  const lastDealerReward = React.useCallback(async () => {
    setLoading(true);
    const { ethereum } = window;
    if (!ethereum) return;
    try{
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const lastDealer = await contract.getLastDealerReward();
      console.log(lastDealer);
      return lastDealer;
    }catch (err:unknown){
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
    }finally{
      setLoading(false);
    }
  },[])

  const checkLottery = React.useCallback(async (result: IRewardLottery) => {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const transaction = await contract.calculateReward(result.first,result.last3f_1,result.last3f_2,result.last3b_1,result.last3b_2,result.last2);
      setLoading(true);
      await transaction.wait();
    } catch (err: unknown) {
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong!";
      console.log(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [signer]); 

  return {
    getDealer,
    addDealer,
    buyLotteries,
    chooseDealer,
    loading,
    myLotteries,
    myReward,
    imDealer,
    myLastLotteries,
    lastDealerReward,
    checkLottery,
  };
};

export default useLotteryContract;
