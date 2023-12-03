import React from 'react'
import Result from './components/result'
import LotteryReward from './components/LotteryReward'
import apiReward from '@/utils/apiReward'
import { IDate, IRewardLottery, ResultResponse } from '@/interface/lottery/lottery.interface'
import { MyLottery } from './components/MyLottery'
import DealerReward from './components/DealerReward'

type Props = {}

export default async function CheckLotteryPage({}: Props) {

  const response = await apiReward() as ResultResponse;
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
  const date: IDate = {
    day: response.response.displayDate.date,
    month: response.response.displayDate.month,
    year: response.response.displayDate.year
  }
  
  return (
    <>
      <div>
        <div className='font-bold text-3xl'>ตรวจสอบสลาก</div>
        <div className='grid grid-cols-1 xl:grid-cols-3 p-10'>
          <div className='col-span-2 p-2'><Result date={date}/></div>
          <div className='pl-2 pt-2'><LotteryReward reward={reward}/></div>
          <div className='p-2 col-span-2'><MyLottery/></div>
          <div className='pl-2 pt-8'><DealerReward/></div>
        </div>
      </div>
    </>
  )
}