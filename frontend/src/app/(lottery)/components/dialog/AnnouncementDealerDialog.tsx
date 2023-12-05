"use client";

import WaitingTransactionDialog from "@/components/dialog/WaitingTransactionDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useDealer from "@/hooks/useDealer";
import useLotteryContract from "@/hooks/useLotteryContract";
import { toastError, toastSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function AnnouncementDealerDialog() {
  const { chooseDealer, loading } = useLotteryContract();

  const { dealer } = useDealer();

  const router = useRouter();

  const isAnnouncementDealerDay = React.useMemo(() => {
    const date = new Date();
    return date.getMinutes() % 10 === 0;
  }, []);

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

  React.useEffect(() => {
    // console.log(dealer);
    setOpen(isAnnouncementDealerDay && (!dealer || dealer === "0x0000000000000000000000000000000000000000"));
  }, [dealer, isAnnouncementDealerDay]);

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-2">Dealer ได้ประกาศผลแล้ว</DialogTitle>
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
