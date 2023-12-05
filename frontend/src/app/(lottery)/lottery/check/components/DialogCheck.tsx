"use client";
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IRewardLottery } from '@/interface/lottery/lottery.interface'
import useLotteryContract from '@/hooks/useLotteryContract'
import { toastError, toastSuccess } from '@/lib/toast'
import WaitingTransactionDialog from '@/components/dialog/WaitingTransactionDialog';

type Props = {
  result: IRewardLottery
}

export default function DialogCheck({result}: Props) {
  const { checkLottery, loading } = useLotteryContract();
  const [open, setOpen] = React.useState(false);

  const onClickCheckLottery = React.useCallback(async () => {
    try {
      await checkLottery(result);
      toastSuccess("Choose dealer successfully.");
      setOpen(false);
    } catch (err:unknown){
      console.log(err);
      toastError("Something went wrong!");
      setOpen(false);
    }
  }, [checkLottery]);

  React.useEffect(() => {
    setOpen(true);
  },[]);

  return (
    <>
      <WaitingTransactionDialog open={loading}/>
      <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
              <DialogHeader>
              <DialogTitle className="text-center mb-2">
                  ผลสลากออกแล้ว
              </DialogTitle>
              <DialogFooter className="sm:justify-center">
                  <Button onClick={onClickCheckLottery}>ตรวจสลาก</Button>
              </DialogFooter>
              </DialogHeader>
          </DialogContent>
      </Dialog>
    </>
  )
}