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

type Props = {}

export default function Result({}: Props) {
    const [win, setWin] = useState(false);

    return (
    <>
        <div className='bg-[#36517C] rounded-2xl p-10'>
            <div className='grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5'>
                <div className='text-white font-light'>งวดสลาก</div>
                <div className='col-span-2 lg:col-start-1'>
                    <div className='flex'>
                        <div className='text-white font-light'>ปี:</div>
                        <div className='pl-3'>
                            <Select>
                                <SelectTrigger className="w-[180px] h-[30px] bg-[#ECECEC]">
                                    <SelectValue placeholder="กรุณาระบุปี" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>ปี</SelectLabel>
                                    <SelectItem value="2566">2566</SelectItem>
                                    <SelectItem value="2565">2565</SelectItem>
                                    <SelectItem value="2564">2564</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className='flex col-span-2'>
                    <div className='text-white font-light'>งวดที่:</div>
                    <div className='px-3'>
                        <Select>
                                <SelectTrigger className="w-[180px] h-[30px] bg-[#ECECEC]">
                                    <SelectValue placeholder="กรุณาระบุงวด" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>งวดที่</SelectLabel>
                                    <SelectItem value="1">วันที่ 1 เดือน 01</SelectItem>
                                    <SelectItem value="2">วันที่ 16 เดือน 01</SelectItem>
                                    <SelectItem value="3">วันที่ 1 เดือน 02</SelectItem>
                                    <SelectItem value="4">วันที่ 16 เดือน 02</SelectItem>
                                    <SelectItem value="5">วันที่ 1 เดือน 03</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                    </div>
                </div>
                <div><Button variant={'apply'} className='h-[40px] w-full'>ค้นหา</Button></div>
            </div>
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
                <div className='relative col-start-1'>
                    <div className='absolute bottom-0 left-0 text-white font-light text-lg'>เงินรางวัลที่ได้:</div>
                </div>
                <div className='col-start-2 text-green-300 font-bold text-4xl'>20 ETH</div>
            </div>

        </div>
    </>
    )
}