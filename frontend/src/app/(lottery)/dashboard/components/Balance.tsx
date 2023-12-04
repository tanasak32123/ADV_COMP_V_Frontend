"use client"

import { IUser } from '@/interface/lottery/lottery.interface'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useWeb3Store } from '@/state/web3Store'
import React, { useState } from 'react'
import withAuth from '@/components/withAuth'
import useLotteryContract from '@/hooks/useLotteryContract'
import { toastSuccess } from '@/lib/toast'
import { Dialog, DialogContent } from '@/components/ui/dialog'

type Props = {
    user: IUser
}

const Balance = ({user}: Props) => {
    const [dealer, setDealer] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const { address } = useWeb3Store();

    const { addDealer } = useLotteryContract(); 

    const { getDealer } = useLotteryContract();

    let toggleApplyBtn = async () => {
        // setPopupVisible(!popupVisible);
        const result = await addDealer();
        if (result) {
            toastSuccess("You has been added as a dealer.");
        }
    }

    React.useEffect(() => {
        const fetchDealer = async () => {
            const dealerAddress = await getDealer();
            console.log(dealerAddress);
        }
        fetchDealer();
    }, [getDealer]);

    return (
        <>
            <Dialog open={popupVisible} onOpenChange={() => setPopupVisible(!popupVisible)}>
                <DialogContent className={`min-w-[35%] min-h-[35%] m-auto rounded-[10px] flex flex-col`}>
                    <div className='flex font-bold text-xl col-start-1 col-span-2 items-center pt-3'>คุณต้องการเป็น Dealer ใช่มั้ย?</div>
                    <div className='p-5 text-sm'>เงื่อนไขสำหรับการเป็น Dealer คุณต้องวางเงินในบัญชีคุณเป็นเงินมัดจำ ตามที่ระบบกำหนด ซึ่งอาจจะต้องเสียเงินมัดจำทั้งหมด ถ้าหากจำนวนเงินที่ถูกรางวัลมีมากกว่า หรือ เท่ากับเงินมัดจำ นอกจากนี้ Dealer ยังไม่สามารถซื้อสลากในงวดนั้นได้</div>
                    <div className='px-3 flex items-center'>
                        <Checkbox id="term"/>
                        <label htmlFor="term" className='pl-2 text-sm'>ฉันยอมรับเงื่อนไขที่กำหนด</label>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex justify-center col-start-2 col-span-2 lg:col-start-4'><Button onClick={() => setPopupVisible(false)} variant={"ghost"}>ยกเลิก</Button></div>
                        <div className='flex justify-end col-start-6'><Button onClick={toggleApplyBtn} variant={"apply"}>Apply</Button></div>
                    </div>
                </DialogContent>
            </Dialog>
            <div className='flex-initial min-w-700 border-2 bg-darkblue rounded-2xl p-8 h-full'>
                <div className='flex flex-col pt-3'>
                    <div className='grid grid-cols-2'>
                        <div className='text-white py-3'>Address:</div>
                        <p className='flex items-center text-white md:truncate pr-2'>{address}</p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div className='text-white py-3'>Dealer:</div>
                        {!dealer && (
                            <p className='flex items-center text-white'>-</p>
                            )}
                        {dealer && (
                            <p className='flex items-center text-white md:truncate pr-2'>0x123123123</p>
                        )}
                    </div>
                    {/* <div className='text-white py-3'>Dealer: {user.dealerAddr}</div> */}
                    <div className='flex flex-row py-3'>
                        <div className='text-lg text-white font-bold'>Balance:</div>
                        <div className='text-center text-white text-3xl font-bold pl-20'>{user.balance} ETH</div>
                    </div>
                    {!dealer && (
                            <div className='flex flex-row-reverse pt-6'>
                                <div className=''><Button variant={'apply'} onClick={() => setPopupVisible(true)}>Apply</Button></div>
                                <div className='flex justify-center items-center text-xs font-light text-white pr-5'>Want to be a Dealer?</div>
                            </div>   
                    )}
                </div>
            </div>
        </>
    )
}

export default withAuth(Balance);