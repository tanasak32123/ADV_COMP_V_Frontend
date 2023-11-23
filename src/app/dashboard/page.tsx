import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Lottery from './components/Lottery'
import { IRewardLottery, IUser, ResultData, ResultResponse, ResultReward } from '@/Interface/Lottery/Lottery.interface';
import Balance from './components/Balance';
import Wallet from './components/Wallet';

async function logLottery(){
    const response = await fetch("https://www.glo.or.th/api/lottery/getLatestLottery",{
        method: "POST"
    });
    return response.json()
}

// type Props = {}

export default async function page() {
    const response = await logLottery() as ResultResponse;
    const reward: IRewardLottery = {
        first: response.response.data.first.number[0].value,
        last3f_1: response.response.data.last3f.number[0].value,
        last3f_2: response.response.data.last3f.number[1].value,
        last3b_1: response.response.data.last3b.number[0].value,
        last3b_2: response.response.data.last3b.number[1].value,
        last2: response.response.data.last2.number[0].value,
        day: response.response.displayDate.date,
        month: response.response.displayDate.month,
        year: response.response.displayDate.year
    };

    const user:IUser = {
        userAddr: "0x12345",
        balance: 1
    };

  return (
    <>
       <div className='grid grid-cols-1 lg:grid-cols-3'>
            <div className='col-span-2 p-10'><Lottery reward={reward} /></div>
            <div className='p-10'><Balance user={user}/></div>
       </div>
       <div className='grid grid-cols-1'>
        <div className='px-10 pt-4'><Wallet reward={reward}/></div>
       </div>
    </>
  )
}