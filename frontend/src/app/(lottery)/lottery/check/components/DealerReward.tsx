"use client";

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox';
import withAuth from '@/components/withAuth'
import { useWeb3Store } from '@/state/web3Store';
import React, { useState } from 'react'
import Modal from 'react-modal';
import useDealerReward from '../hooks/useDealerReward';

type Props = {} 

const Dealer = ({}: Props) => {
  const {reward,loading} = useDealerReward();
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
        <div className='px-10 pt-14 border-2 border-black bg-white h-auto'>
          <div className='font-bold text-roman font-serif text-3xl'>Dealer</div>
          <div className='grid grid-rows-2 grid-cols-2 pt-10 pb-5'>
            <div className='relative'>
              <div className='absolute bottom-0 left-0 font-light'>income result:</div>
            </div>
            <div className='relative pt-8'>
              <div className='absolute bottom-0 right-0 font-bold text-3xl text-green-500'>{loading ? "loading" : Number(reward) } ETH</div>
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