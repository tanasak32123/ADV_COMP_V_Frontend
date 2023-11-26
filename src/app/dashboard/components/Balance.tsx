"use client"
import { IUser } from '@/Interface/Lottery/Lottery.interface'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useWeb3Store } from '@/state/web3Store'
import { Divide } from 'lucide-react'
import React, { useState } from 'react'
import Modal from 'react-modal';

type Props = {
    user: IUser
}

export default function Balance({user}: Props) {
    const [dealer, setDealer] = useState(true);
    const [popupVisible, setPopupVisible] = useState(false);
    const { address } = useWeb3Store();

    let togglePopup = (): void => {
        setPopupVisible(!popupVisible);
    }

    const customStyles = {
        content: {
            width: '35%', // Set the width as desired
            height: '35%', // Set the height as desired
            margin: 'auto', // Center the modal
            borderRadius: '10px'
        },
    };

    return (
        <>
            <Modal
            isOpen={popupVisible}
            style={customStyles}
            >
                <div className='flex font-bold text-xl col-start-1 col-span-2 items-center pt-3'>คุณต้องการเป็น Dealer ใช่มั้ย?</div>
                <div className='p-5 text-sm'>เงื่อนไขสำหรับการเป็น Dealer คุณต้องวางเงินในบัญชีคุณเป็นเงินมัดจำ ตามที่ระบบกำหนด ซึ่งอาจจะต้องเสียเงินมัดจำทั้งหมด ถ้าหากจำนวนเงินที่ถูกรางวัลมีมากกว่า หรือ เท่ากับเงินมัดจำ นอกจากนี้ Dealer ยังไม่สามารถซื้อสลากในงวดนั้นได้</div>
                <div className='px-3'>
                    <Checkbox id="term"/>
                    <label htmlFor="term" className='pl-2 text-sm'>ฉันยอมรับเงื่อนไขที่กำหนด</label>
                </div>
                <div className='grid grid-cols-6'>
                    <div className='flex justify-center col-start-2 col-span-2 lg:col-start-4'><Button onClick={togglePopup} variant={"ghost"}>ยกเลิก</Button></div>
                    <div className='flex justify-end col-start-6'><Button onClick={togglePopup} variant={"apply"}>Apply</Button></div>
                </div>
            </Modal>
            <div className='flex-initial min-w-700 border-2 bg-darkblue rounded-2xl p-8 h-full'>
                <div className='flex flex-col pt-3'>
                    <div className='grid grid-cols-2'>
                        <div className='text-white py-3'>Address:</div>
                        <p className='flex items-center text-white md:truncate pr-2'>{address}</p>
                    </div>
                    <div className='text-white py-3'>Dealer: {user.dealerAddr}</div>
                    <div className='flex flex-row py-3'>
                        <div className='text-lg text-white font-bold'>Balance:</div>
                        <div className='text-center text-white text-3xl font-bold pl-20'>{user.balance} ETH</div>
                    </div>
                    {!dealer && (
                            <div className='flex flex-row-reverse pt-6'>
                                <div className=''><Button variant={'apply'} onClick={togglePopup}>Apply</Button></div>
                                <div className='flex justify-center items-center text-xs font-light text-white pr-5'>Want to be a Dealer?</div>
                            </div>   
                    )}
                </div>
            </div>
        </>
    )
}