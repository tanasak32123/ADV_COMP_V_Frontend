import { IUser } from '@/Interface/Lottery/Lottery.interface'
import React from 'react'

type Props = {
    user: IUser
}

export default function Balance({user}: Props) {
  return (
    <>
        <div className='border-2 bg-darkblue rounded-2xl'>
            Balance
        </div>
    </>
  )
}