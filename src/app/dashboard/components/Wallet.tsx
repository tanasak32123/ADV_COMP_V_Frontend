import React from 'react'
import { SearchLottery } from './SearchLottery'
import { IRewardLottery } from '@/Interface/Lottery/lottery.interface';
import { Button } from '@/components/ui/button';
import { LotteryTable } from './LotteryTable';


type Props = {
    reward: IRewardLottery;
}

export default function Wallet({reward}: Props) {
  return (
    <>
        <div className='border-black border-2 rounded-2xl grid grid-rows-2 mb-8'>
            <div className='bg-[#7AA7EE] border-black border-b-2 bg-fixed rounded-2xl h-14'>
                <div className='font-bold text-white pl-10 pt-4'>สลากของฉัน:</div>
            </div>
            <div className='grid grid-cols-10 gap-4 py-4'>
                <div className='col-start-2 col-span-2'><SearchLottery/></div>
                <div className='col-start-4 cols-span-3'><Button variant={"search"} className='w-full text-white font-bold rounded-xl'>ค้นหา</Button></div>
                <div className='flex justify-center items-center col-start-7 col-span-3'>งวดประจำวันที่ {reward.day} เดือน {reward.month} ปี {reward.year}</div>
            </div>
            <div className='p-10 overflow-y-auto h-80'><LotteryTable/></div>
        </div>
    </>
  )
}