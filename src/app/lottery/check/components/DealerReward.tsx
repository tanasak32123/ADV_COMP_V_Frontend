import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {} 

export default function ({}: Props) {
  return (
    <>
        <div className='px-10 pt-14 border-2 border-black bg-white h-auto'>
          <div className='font-bold text-roman font-serif text-3xl'>Dealer</div>
          <div className='grid grid-rows-2 grid-cols-2 pt-10 pb-5'>
            <div className='relative'>
              <div className='absolute bottom-0 left-0 font-light'>income result:</div>
            </div>
            <div className='relative pt-8'>
              <div className='absolute bottom-0 right-0 font-bold text-3xl text-green-500'>50 ETH</div>
            </div>
            <div className='relative row-start-2 col-span-2'>
              <div className='absolute right-0 text-green-500 text-3xl font-bold'>(123123 BAHT)</div>
            </div>
          </div>
          <div className='grid grid-cols-2 py-5'>
            <div className='text-end pr-3 font-extralight text-sm xl:text-start'>If you want to be a Dealer. Please register</div>
            <Button className='' variant={'apply'}>Apply</Button>
          </div>
        </div>
    </>
  )
}