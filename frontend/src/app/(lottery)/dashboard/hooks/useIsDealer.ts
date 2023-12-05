import useLotteryContract from "@/hooks/useLotteryContract";
import React from "react";
import { useState } from "react";

const useIsDealer = () => {
    const {imDealer} = useLotteryContract();
    const [loading,setLoading] = useState(false);
    const [im,setIm] = useState(false);
    
    const fetchimDealer = React.useCallback(async () => {
        setLoading(true);
        const im_dealer = await imDealer();
        setIm(im_dealer);
    },[imDealer])

    React.useEffect(() => {
        fetchimDealer().then(() => {
            setLoading(false);
        });
    },[fetchimDealer]);

    return {im, loading, fetchimDealer};
}

export default useIsDealer;