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
        setLoading(false);
    },[myReward])

    React.useEffect(() => {
        fetchReward();
    },[fetchReward])

    return {reward,loading, fetchReward};

}

export default useReward;