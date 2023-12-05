import useLotteryContract from "@/hooks/useLotteryContract";
import React from "react";
import { useState } from "react";

const useDealerReward = () => {
    const [reward,setReward] = useState('');
    const [loading,setLoading] = useState(false);
    const {lastDealerReward} = useLotteryContract();

    const fetchDealerReward = React.useCallback(async () => {
        setLoading(true);
        const eth = await lastDealerReward();
        setReward(eth);
    },[lastDealerReward])

    React.useEffect(() => {
        fetchDealerReward();
        setLoading(false);
    },[])

    return {reward,loading};

}

export default useDealerReward;