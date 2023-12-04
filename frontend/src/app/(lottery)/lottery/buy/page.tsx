"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DIGIT_TYPE,
  IBuyLottery,
  PLAY_TYPE,
} from "@/interface/lottery/buy_lottery.interface";
import React from "react";
import BuyLotteryForm from "./components/BuyLotteryForm";
import LotteryList from "./components/LotteryList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import useLotteryContract from "@/hooks/useLotteryContract";
import { toastError, toastSuccess } from "@/lib/toast";

export type TLottery = { id: number } & IBuyLottery;

const BuyLotteryPage = () => {
  const router = useRouter();

  const [lotteries, setLotteries] = React.useState<TLottery[]>([]);
  const [digit, setDigit] = React.useState<DIGIT_TYPE>(DIGIT_TYPE.TWO);
  const toggleDigitRef = React.useRef<HTMLDivElement | null>(null);

  const { buyLotteries } = useLotteryContract();

  const handleChangeDigit = React.useCallback((val: DIGIT_TYPE) => {
    if (!val) return;
    setDigit(val);
  }, []);

  const totalPrice = React.useMemo(
    () =>
      lotteries.reduce(
        (prev, current) => prev + current.amount * current.baitValue,
        0
      ),
    [lotteries]
  );

  const onClickCancelBtn = React.useCallback(() => {
    setLotteries([]);
  }, []);

  const onClickPurchase = React.useCallback(async () => {
    const data = lotteries.map((lottery) => {
      const { id: _, ...rest } = lottery;
      return [
        rest.baitNumber,
        rest.amount,
        rest.baitValue,
        rest.digitType,
        rest.digitType === DIGIT_TYPE.TWO ? PLAY_TYPE.ALL : rest.playType,
        rest.arrangeType,
      ];
    });

    try {
      await buyLotteries(data, totalPrice);
      toastSuccess("You buy lotteries successfully.");
      return router.push("/dashboard");
    } catch {
      toastError("Something went wrong!");
    }
  }, [buyLotteries, lotteries, router, totalPrice]);

  return (
    <div className="grid content-between h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-6">
        <div>
          <div className="font-bold text-lg">
            ซื้อสลาก{" "}
            <span className="text-orange-400">
              (rate ในการได้เงินรางวัล = 1:4)
            </span>
          </div>

          <div className="bg-[#ECECEC] rounded-[30px] py-4 px-2 sm:px-4 mt-6">
            <div className="flex justify-start">
              <ToggleGroup
                defaultValue={digit}
                ref={toggleDigitRef}
                onValueChange={handleChangeDigit}
                type="single"
                className="bg-[#36517C] text-white p-2 rounded-[30px] flex gap-x-3"
              >
                <ToggleGroupItem
                  value={DIGIT_TYPE.TWO}
                  aria-label="Toggle 2 digit"
                  className="rounded-[30px] h-fit w-[80px]"
                >
                  2 หลัก
                </ToggleGroupItem>
                <ToggleGroupItem
                  value={DIGIT_TYPE.THREE}
                  aria-label="Toggle 3 digit"
                  className="rounded-[30px] h-fit w-[80px]"
                >
                  3 หลัก
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="p-3 sm:p-6">
              <BuyLotteryForm
                digit={digit}
                lotteries={lotteries}
                addLottery={setLotteries}
              />
            </div>
          </div>
        </div>
        <div>
          <LotteryList lotteries={lotteries} deleteLottery={setLotteries} />
        </div>
      </div>

      {lotteries.length > 0 && (
        <div className="flex justify-between">
          <Button
            className="bg-[#F6F6F6] hover:bg-[#e6e5e5] text-black rounded-[40px]"
            onClick={onClickCancelBtn}
          >
            Clear
          </Button>

          <div className="flex gap-x-1 items-center">
            <div className="text-xs sm:text-sm">
               ทั้งหมด{" "}
              <span className="text-green-500 font-bold">
                {totalPrice.toLocaleString()} ETH
              </span>
            </div>
            <Button
              onClick={onClickPurchase}
              className="bg-[#FF9345] hover:bg-[#ea9151] text-black rounded-[40px]"
            >
              Purchase
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(BuyLotteryPage);
