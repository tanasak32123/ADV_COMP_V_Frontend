import useWeb3 from '@/hooks/useWeb3';
import React from 'react';

const useBalance = () => {
    const { myBalance } = useWeb3();

    const [balance, setBalance] = React.useState(BigInt(0));
    const [loading, setLoading] = React.useState(false)

    const fetchBalance = React.useCallback(async () => {
        setLoading(true);
        const balance = await myBalance();
        if (!balance) return;
        setBalance(balance);
    },[myBalance])
    
    React.useEffect(() => {
        fetchBalance().then(() => {
        setLoading(false);
        });
    },[fetchBalance]);

    return { balance, loading};
}

export default useBalance;