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
import { IRewardLottery, IUser, ResultData, ResultResponse, ResultReward } from '@/interface/Lottery/lottery.interface';
import Balance from './components/Balance';

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
        last3f: response.response.data.last3f.number[0].value,
        last3b: response.response.data.last3b.number[0].value,
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
       <div className='flex'>
            <div className='flex-auto w-1/2 p-10'><Lottery reward={reward}  /></div>
            <div className='flex-auto w-1/5 p-10'><Balance user={user}/></div>
       </div>
       <div className='flex'>
        <div className='w-1/2'>a</div>
        <div className='w-1/2'>b</div>
       </div>
    </>
  )
}