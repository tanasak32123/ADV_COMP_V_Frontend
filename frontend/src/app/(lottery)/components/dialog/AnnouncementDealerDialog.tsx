"use client";

import WaitingTransactionDialog from "@/components/dialog/WaitingTransactionDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCountdownTimer from "@/hooks/useCountdownTimer";
import useDealer from "@/hooks/useDealer";
import useLotteryContract from "@/hooks/useLotteryContract";
import { toastError, toastSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";
import React from "react";

// const getNextDealerTimer = () => {
//   const nowTime = new Date();
//   const nowYear = nowTime.getFullYear();
//   const nowMonth = nowTime.getMonth();
//   const nowDate = nowTime.getDate();

//   const nextDate = nowDate <= 16 ? 5 : 21;
//   const nextMonth = nowDate >= 16 ? nowMonth + 1 : nowMonth;
//   const nextYear = nowYear === 12 && nowDate >= 16 ? nowYear + 1 : nowYear;
//   const nextTime = new Date(nextYear, nextMonth, nextDate);
  
//   return nextTime;
// };

export default function AnnouncementDealerDialog() {
  const { chooseDealer, loading } = useLotteryContract();

  const { dealer } = useDealer();

  const router = useRouter();

  // const { state: timer } = useCountdownTimer({ countdownDate: getNextDealerTimer() });

  const [open, setOpen] = React.useState(false);

  const onClickCheckDealerBtn = React.useCallback(async () => {
    try {
      await chooseDealer();
      toastSuccess("Choose dealer successfully.");
      router.push("/dashboard");
    } catch {
      toastError("Something went wrong!");
      setOpen(false);
    }
  }, [chooseDealer, router]);

  const onOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value && !localStorage.hasOwnProperty('isCheckDealerIsPop')) localStorage.setItem('isCheckDealerIsPop', 'true');
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getMinutes() % 5 === 0 && !localStorage.hasOwnProperty('isCheckDealerIsPop')) setOpen(dealer === '0x0000000000000000000000000000000000000000'); 
    }, 1000);

    return () => clearInterval(interval);
  }, [dealer, open])

  return (
    <>
      <Dialog open={open} onOpenChange={val => onOpenChange(val)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center mb-2">
              Dealer ได้ประกาศผลแล้ว
            </DialogTitle>
            <DialogFooter className="sm:justify-center">
              <Button onClick={onClickCheckDealerBtn}>ดู Dealer</Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <WaitingTransactionDialog open={loading} />
    </>
  );
}
