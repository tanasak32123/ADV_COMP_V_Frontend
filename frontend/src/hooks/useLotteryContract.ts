import ABI from "@/data/abi/Lottery.json";
import React from "react";
import { ethers, BrowserProvider, JsonRpcSigner } from "ethers";
import { TWeb3Store, useWeb3Store } from "@/state/web3Store";
import useStore from "./useStore";

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


  // ยังไม่ได้แก้ตอน ปิด transaction 
  const addDealer = React.useCallback(async () => {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const transaction = await contract.addDealer({ value: 50 });
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
    setLoading(true);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      await contract.chooseDealer();
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
      console.log('lotteries');
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

  return {
    getDealer,
    addDealer,
    buyLotteries,
    chooseDealer,
    loading,
    myLotteries,
  };
};

export default useLotteryContract;
