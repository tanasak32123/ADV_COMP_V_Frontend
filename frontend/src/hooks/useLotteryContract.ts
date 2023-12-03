import ABI from "@/data/abi/Lottery.json";
import React from "react";
import { ethers, BrowserProvider } from "ethers";

const CONTRACT_ADDRESS = "0xBcd3c91e1A6fC29Fa2a0aDF3Ec64aad3DAcB7aB9";

const useLotteryContract = () => {
  const [loading, setLoading] = React.useState(false);

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

  return {
    getDealer,
    loading,
  };
};

export default useLotteryContract;
