import React from 'react'
import { Button } from '@/components/ui/button';
import { IRewardLottery } from '@/Interface/Lottery/Lottery.interface';

type Props = {
   reward: IRewardLottery;
}

export default function Lottery({reward}: Props) {
  return (
    <>
        <div className='border-2 border-black p-10 rounded-2xl h-full'>
                <div className='flex flex-col'>
                    <div className='flex flex-row mb-2'>
                        <div className='flex justify-center w-3/5 border-b-10 border-indigo-500 items-center font-bold text-xl'>ผลสลากกินแบ่งรัฐบาลประจำงวดวันที่ {reward.day} เดือน {reward.month} ปี {reward.year}</div>
                        <div className='flex justify-center w-2/5 p-5'><Button variant="check">ตรวจสลาก</Button></div>
                    </div>
                    <hr className='border-1 border-black'/>
                    <div className='flex flex-row mt-2 justify-center p-8'>
                        <div className='flex flex-col mx-5'>
                            <div className='font-bold'>รางวัลที่ 1</div>
                            <div className='flex justify-center items-center font-light'>{reward.first}</div>
                        </div>
                        <div className='flex flex-col mx-5'>
                            <div className='font-bold'>รางวัลเลขหน้า 3 ตัว</div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex justify-center items-center font-light'>{reward.last3f_1}</div>
                                <div className='flex justify-center items-center font-light'>{reward.last3f_2}</div>
                            </div>
                        </div>
                        <div className='flex flex-col mx-5'>
                            <div className='font-bold'>รางวัลเลขท้าย 3 ตัว</div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex justify-center items-center font-light'>{reward.last3b_1}</div>
                                <div className='flex justify-center items-center font-light'>{reward.last3b_2}</div>
                            </div>
                        </div>
                        <div className='flex flex-col mx-5'>
                            <div className='font-bold'>รางวัลเลขท้าย 2 ตัว</div>
                            <div className='flex justify-center items-center font-light'>{reward.last2}</div>
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}