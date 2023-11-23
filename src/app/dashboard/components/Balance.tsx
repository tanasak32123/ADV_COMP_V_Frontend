import { IUser } from '@/Interface/Lottery/Lottery.interface'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

type Props = {
    user: IUser
}


export default function Balance({user}: Props) {
    // const [dealer, setDealer] = useState(user.dealerAddr)
    console.log(user.dealerAddr == null);
    console.log(user.userAddr);

    return (
        <>
            <div className='flex-initial min-w-700 border-2 bg-darkblue rounded-2xl p-8 h-full'>
                <div className='flex flex-col pt-3'>
                    <div className='text-white py-3'>Address: {user.userAddr}</div>
                    <div className='text-white py-3'>Dealer: {user.dealerAddr}</div>
                    <div className='flex flex-row py-2'>
                        <div className='text-lg text-white font-bold'>Balance:</div>
                        <div className='text-center text-white text-3xl font-bold pl-20'>{user.balance} ETH</div>
                    </div>
                    <div className='flex flex-row-reverse pt-6'>
                        <div className=''><Button variant={'apply'}>Apply</Button></div>
                        <div className='flex justify-center items-center text-xs font-light text-white pr-5'>Want to be a Dealer?</div>
                    </div>   
                </div>
            </div>
        </>
    )
}