import useLotteryContract from "@/hooks/useLotteryContract";
import { IBuyLottery } from "@/interface/lottery/buy_lottery.interface";
import React from "react";
import { useState } from "react";

const useLastLottery = () => {
    const[loading, setLoading] = useState(false);
    const[myLottery, setMyLottery] = useState<({id:number} & IBuyLottery)[]>();
    const {myLastLotteries} = useLotteryContract();

    const fetchMyLotteries = React.useCallback(async () => {
        setLoading(true);
        const data = await myLastLotteries();
        if (!data) return [];
        const last_lottery = data.map((e: any[], i: number) => {
            const playType = Number(e[3]) === 0 ? "-" : Number(e[4]) === 1 ? "หน้า" : "หลัง";
            const arrangeType = Number(e[5]) === 0 ? "โต๊ด" : "เต๊ง";
            return { id: i, baitNumber: e[0],playType , amount: Number(e[1]), baitValue: Number(e[2]), arrangeType }
        }) as ({id:number} & IBuyLottery)[];
        setMyLottery(last_lottery);
        setLoading(false);
    },[myLastLotteries])

    React.useEffect(() => {
        fetchMyLotteries();
    },[fetchMyLotteries])

    return {myLottery, loading, fetchMyLotteries};

}

export default useLastLottery;