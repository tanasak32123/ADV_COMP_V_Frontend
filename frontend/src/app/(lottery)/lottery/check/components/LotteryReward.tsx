"use client";
import { IRewardLottery } from '@/interface/lottery/lottery.interface';
import React from 'react'

type Props = {
  reward: IRewardLottery
}

export default function LotteryReward({ reward }: Props) {
  return (
    <>
        <div className='p-8 border-2 border-black bg-white h-full'>
          <div className='font-base text-2xl bg-[#36517C] rounded-md text-white p-3'>ผลรางวัลประจำงวด</div>
          <div className='grid grid-rows-4 p-5'>
            <div className='flex flex-row justify-center item-center'>
              <div className='font-bold text-3xl text-[#FF7511]'>รางวัลที่ 1</div>
              <div className='font-bold text-3xl pl-5 text-[#FF7511]'>{reward.first}</div>
            </div>
            <div className='flex justify-between pt-3'>
              <div className='font-normal text-lg text-[#36517C]'>รางวัลเลขหน้า 3 ตัว</div>
              <div className='font-normal text-lg pl-5 text-[#36517C]'>{reward.last3f_1}</div>
              <div className='font-normal text-lg pl-5 text-[#36517C]'>{reward.last3f_2}</div>
            </div>
            <div className='flex justify-between pt-3'>
              <div className='font-normal text-lg text-[#36517C]'>รางวัลเลขท้าย 3 ตัว</div>
              <div className='font-normal text-lg pl-5 text-[#36517C]'>{reward.last3b_1}</div>
              <div className='font-normal text-lg pl-5 text-[#36517C]'>{reward.last3b_2}</div>
            </div>
            <div className='flex justify-between pt-3'>
              <div className='font-normal text-lg text-[#36517C]'>รางวัลเลขท้าย 2 ตัว</div>
              <div className='font-normal text-lg pl-5 text-[#36517C]'>{reward.last2}</div>
            </div>
          </div>
        </div>
    </>
  )
}