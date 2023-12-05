import useLotteryContract from "@/hooks/useLotteryContract";
import { DIGIT_TYPE, IBuyLottery } from "@/interface/lottery/buy_lottery.interface";
import React, { useState } from "react";

const useLottery = () => {
    const { myLotteries } = useLotteryContract();
    const [myLottery, setMyLottery] = useState<({id:number} & IBuyLottery)[]>();
    
    const fetchMylotteries = React.useCallback(async () => {
        const data = await myLotteries();
        if (!data) return [];
        const myLottery = data.map((e: any[], i: number) => {
            const playType = Number(e[3]) === 0 ? "-" : Number(e[4]) === 1 ? "หน้า" : "หลัง";
            const arrangeType = Number(e[5]) === 0 ? "โต๊ด" : "เต๊ง";
            return { id: i, baitNumber: e[0],playType , amount: Number(e[1]), baitValue: Number(e[2]), arrangeType }
        }) as ({id:number} & IBuyLottery)[];
        setMyLottery(myLottery);
    },[])

    React.useEffect(() => {
        fetchMylotteries();
    }, []);

    return myLottery;
}

export default useLottery;

