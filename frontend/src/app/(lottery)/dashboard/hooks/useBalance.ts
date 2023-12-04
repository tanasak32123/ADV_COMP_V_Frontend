import useWeb3 from '@/hooks/useWeb3';
import React from 'react';

const useBalance = () => {
    const { myBalance } = useWeb3();

    const [balance, setBalance] = React.useState(BigInt(0));

    React.useEffect(() => {
        const fetchBalance = async () => {
            const balance = await myBalance();
            if (!balance) return;
            setBalance(balance);
        }

        fetchBalance();
    },[]);

    return { balance };
}

export default useBalance;