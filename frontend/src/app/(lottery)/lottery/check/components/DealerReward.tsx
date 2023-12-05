"use client";

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox';
import withAuth from '@/components/withAuth'
import React from 'react'
import useDealerReward from '../hooks/useDealerReward';
import { ethers } from 'ethers';
import { toastError, toastSuccess } from '@/lib/toast';
import useLotteryContract from '@/hooks/useLotteryContract';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type Props = {} 

const Dealer = ({}: Props) => {
  const { addDealer } = useLotteryContract();
  const {reward,loading,fetchDealerReward} = useDealerReward();
  const reward_eth = ethers.formatEther(Number(reward));
  const [consent,setConsent] = React.useState(false);
  const [popupVisible, setPopupVisible] = React.useState(false);
  const router = useRouter();
  
  const togglePopup = React.useCallback(() => {
    setPopupVisible((prev) => !prev);
  }, []);

  const applyTransaction = React.useCallback(async () => {
    const {result, message} = await addDealer();
    if (result){
      toastSuccess("ลงทะเบียน Dealer สำเร็จ");
    }else{
      if (message === "CALL_EXCEPTION"){
          toastError("จำนวน ETH ไม่เพียงพอ");
      }else{
          toastError("Transaction Cancelled");
      }
    }
    setPopupVisible(false);
    setConsent(false);
    router.push('/dashboard');
  }, [addDealer, router])

  const toggleConsent = React.useCallback(() => {
    setConsent((prev) => !prev);
  }, []);

  return (
    <>
        <Dialog open={popupVisible} onOpenChange={() => {setPopupVisible(!popupVisible); setConsent(false);}}>
          <DialogContent className={`min-w-[35%] min-h-[35%] m-auto rounded-[10px] flex flex-col`}>
              <div className='flex font-bold text-xl col-start-1 col-span-2 items-center pt-3'>คุณต้องการเป็น Dealer ใช่มั้ย?</div>
              <div className='p-5 text-sm'>เงื่อนไขสำหรับการเป็น Dealer คุณต้องวางเงินในบัญชีคุณเป็นเงินมัดจำ ตามที่ระบบกำหนด ซึ่งอาจจะต้องเสียเงินมัดจำทั้งหมด ถ้าหากจำนวนเงินที่ถูกรางวัลมีมากกว่า หรือ เท่ากับเงินมัดจำ นอกจากนี้ Dealer ยังไม่สามารถซื้อสลากในงวดนั้นได้</div>
              <div className='px-3 flex items-center'>
                  <Checkbox id="term" onCheckedChange={toggleConsent}/>
                  <label htmlFor="term" className='pl-2 text-sm'>ฉันยอมรับเงื่อนไขที่กำหนด</label>
              </div>
              <div className='flex justify-between'>
                  <div className='flex justify-center col-start-2 col-span-2 lg:col-start-4'><Button onClick={() => setPopupVisible(false)} variant={"ghost"}>ยกเลิก</Button></div>
                  <div className='flex justify-end col-start-6'>
                      <Button onClick={applyTransaction} variant={"apply"} disabled={!consent}>Apply</Button>
                  </div>
              </div>
          </DialogContent>
        </Dialog>
        <div className='px-10 pt-14 border-2 border-black bg-white h-auto'>
          <div className='font-bold text-roman font-serif text-3xl'>Dealer</div>
          <div className='grid grid-rows-3 pt-5 pb-5 gap-y-2'>
            <div className='relative '>
              <div className='absolute bottom-0 left-0 font-light'>income result:</div>
            </div>
            <div className='row-start-3 relative pt-8'>
              <div className='absolute bottom-0 right-0 font-bold text-3xl text-green-500 text-right'>{loading ? "loading" : reward_eth } ETH</div>
            </div>
          </div>
          <div className='grid grid-cols-2 py-5'>
            <div className='text-end pr-3 font-extralight text-sm xl:text-start'>If you want to be a Dealer. Please register</div>
            <Button className='' variant={'apply'} onClick={togglePopup}>Apply</Button>
          </div>
        </div>
    </>
  )
}

export default withAuth(Dealer);