"use client";

import { Button } from "@/components/ui/button";
import useCountdownTimer from "@/hooks/useCountdownTimer";
import useStore from "@/hooks/useStore";
import { IRewardLottery } from "@/interface/lottery/lottery.interface";
import { TWeb3Store, useWeb3Store } from "@/state/web3Store";
import { useRouter } from "next/navigation";
import React from "react";
import RewardTimerContainer from "./RewardTimerContainer";

type Props = {
  reward: IRewardLottery;
};

const getNextRewardTimer = () => {
  const nowTime = new Date();
  const nowYear = nowTime.getFullYear();
  const nowMonth = nowTime.getMonth();
  const nowDate = nowTime.getDate();

  const nextDate = nowDate > 17 ? 1 : nowDate < 17 ? 16 : 1;
  const nextMonth = nowDate > 17 ? nowMonth + 1 : nowMonth;
  const nextYear = nowYear === 12 && nowDate > 17 ? nowYear + 1 : nowYear;
  const nextTime = new Date(nextYear, nextMonth, nextDate, 18);

  return nextTime;
};

export default function AwardResult({ reward }: Props) {
  const { data: isAuthenticated } = useStore<TWeb3Store, boolean>(
    useWeb3Store,
    (state) => state.isAuthenticated
  );

  const router = useRouter();

  const { state: timer } = useCountdownTimer({ countdownDate: getNextRewardTimer() });

  return (
    <div className="bg-white w-full text-black mt-10 p-4 rounded-[30px]">
      <div className="w-full grid grid-cols-1 sm:grid-cols-5 items-center border-b-2 border-black pb-3">
        <div className="font-bold text-base w-full me-5 py-2 sm:col-span-4">
          ผลสลากกินแบ่งรัฐบาล <span className="whitespace-nowrap">ประจำงวดที่ {reward.day} / {reward.month} /{" "}
          {reward.year}</span>
        </div>
        {isAuthenticated && (
          <div className="w-full text-end sm:col-span-1">
            <Button
              className="bg-[#7AA6EE] text-white rounded-[20px]"
              onClick={() => router.push("/lottery/check")}
            >
              ตรวจรางวัล
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 mt-6">
        <div className="flex sm:flex-col items-center justify-between">
          <div className="font-semibold text-sm">รางวัล 1</div>
          <div className="font-bold text-lg">{reward.first}</div>
        </div>
        <div className="flex sm:flex-col items-center justify-between">
          <div className="font-semibold text-sm">เลขท้าย 3 ตัว</div>
          <div className="font-bold text-lg">
            {reward.last3b_1}&emsp;{reward.last3b_2}
          </div>
        </div>
        <div className="flex sm:flex-col items-center justify-between">
          <div className="font-semibold text-sm">เลขหน้า 3 ตัว</div>
          <div className="font-bold text-lg">
            {reward.last3f_1}&emsp;{reward.last3f_2}
          </div>
        </div>
        <div className="flex sm:flex-col items-center justify-between">
          <div className="font-semibold text-sm">เลขท้าย 2 ตัว</div>
          <div className="font-bold text-lg">{reward.last2}</div>
        </div>
      </div>

      <div className="mt-3">
        <RewardTimerContainer timer={timer} />
      </div>
    </div>
  );
}
