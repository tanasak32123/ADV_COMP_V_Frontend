import React from 'react'
import { SearchLottery } from './SearchLottery'
import { IRewardLottery } from '@/interface/lottery/lottery.interface';
import { Button } from '@/components/ui/button';
import { LotteryTableData } from './LotteryTableData';

type Props = {
    reward: IRewardLottery;
}

export default function Wallet({reward}: Props) {
  return (
    <>
        <div className='border-black border-2 rounded-2xl grid grid-rows-10 '>
            <div className='bg-[#7AA7EE] border-black border-b-2 bg-fixed rounded-2xl h-14 row-auto'>
                <div className='font-bold text-white pl-10 pt-4'>สลากของฉัน:</div>
            </div>
            <div className='p-10 row-auto'><LotteryTableData reward={reward}/></div>
        </div>
    </>
  )
}