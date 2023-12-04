import React from 'react';
import useLotteryContract from './useLotteryContract';

const useDealer = () => {
    const [dealer, setDealer] = React.useState("");
    const [isDealer, setIsDealer] = React.useState(false);

    const { getDealer } = useLotteryContract();

    React.useEffect(() => {
        const fetchDealer = async () => {
            const dealerAddress = await getDealer();
            console.log(dealerAddress);
            if (dealerAddress != undefined && dealerAddress != '0x0000000000000000000000000000000000000000'){
                setDealer(dealerAddress);
                setIsDealer(true);
            }
        }
        fetchDealer();
    }, [getDealer]);

    return { dealer, isDealer }
}

export default useDealer;