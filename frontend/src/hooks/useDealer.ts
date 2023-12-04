import React from 'react';
import useLotteryContract from './useLotteryContract';
import useStore from './useStore';
import { TWeb3Store, useWeb3Store } from '@/state/web3Store';

const useDealer = () => {
    const [dealer, setDealer] = React.useState<string>();
    const [isDealer, setIsDealer] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const { getDealer } = useLotteryContract();

    const { data: address } = useStore<TWeb3Store, string>(useWeb3Store, (state) => state.address);

    const fetchDealer = React.useCallback(async () => {
        const dealerAddress = await getDealer();
        if (!dealerAddress) return;
        setDealer(dealerAddress);
        setIsDealer(dealerAddress === address);
    }, [address, getDealer]);

    React.useEffect(() => {
        fetchDealer().then(() => {
            setLoading(false);
        });
    }, [fetchDealer]);

    return { dealer, isDealer, loading }
}

export default useDealer;