"use client";
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { IDate } from '@/Interface/Lottery/lottery.interface';

type Props = {
    date: IDate
}

export default function Result({date}: Props) {
    const [win, setWin] = useState(false);

    return (
    <>
        <div className='bg-[#36517C] rounded-2xl p-12 h-full'>
            <div className='text-white font-light'>งวดสลากประจำวันที่ {date.day} เดือน {date.month} ปี {date.year}</div>
            <div className='pt-10'>
                {win && (
                    <div className='grid place-items-center font-bold text-white text-xl'>คุณถูกรางวัล!!!</div>
                )}
                {!win && (
                    <div className='grid place-items-center font-bold text-white text-xl'>เสียใจด้วยคุณไม่ถูกรางวัล ครั้งหน้าเอาใหม่ ;-;</div>
                )
                }
            </div>
            <div className='grid grid-cols-3 pt-14'>
                <div className='relative'>
                    <div className='absolute bottom-0 left-0 text-white font-light text-lg'>เงินรางวัลที่ได้:</div>
                </div>
                <div className='col-span-2'>
                        <div className='text-green-300 font-bold text-4xl'>20ETH (837,493 BAHT)</div>
                </div>
            </div>

        </div>
    </>
    )
}