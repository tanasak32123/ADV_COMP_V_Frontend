import useLotteryContract from "@/hooks/useLotteryContract"
import React, { useState } from "react"

const useReward = () => {
    const [loading, setLoading] = useState(false);
    const [reward, setReward] = useState('');
    const {myReward} = useLotteryContract();
    
    const fetchReward = React.useCallback(async () => {
        setLoading(true);
        const rewardLottery = await myReward();
        setReward(rewardLottery)
    },[myReward])

    React.useEffect(() => {
        fetchReward();
        setLoading(false);
    },[])

    return {reward,loading};

}

export default useReward;