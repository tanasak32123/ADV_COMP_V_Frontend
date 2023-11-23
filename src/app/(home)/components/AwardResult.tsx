import { Button } from "@/components/ui/button";
import {
  IRewardLottery,
  ResultResponse,
} from "@/interface/Lottery/lottery.interface";
import React from "react";

type Props = {
  lottery: ResultResponse;
};

export default function AwardResult({ lottery }: Props) {
  const reward: IRewardLottery = {
    first: lottery.response.data.first.number[0].value,
    last3f: lottery.response.data.last3f.number[0].value,
    last3b: lottery.response.data.last3b.number[0].value,
    last2: lottery.response.data.last2.number[0].value,
    day: lottery.response.displayDate.date,
    month: lottery.response.displayDate.month,
    year: lottery.response.displayDate.year,
  };

  return (
    <div className="bg-white w-full text-black mt-10 p-7 rounded-[30px]">
      <div className="w-full flex items-center">
        <div className="font-bold text-base border-b-2 border-black w-full me-5 py-2">
          ผลสลากกินแบ่งรัฐบาล ประจำงวดที่ {reward.day} / {reward.month} / {reward.year}
        </div>
        <Button className="bg-[#7AA6EE] text-white rounded-[20px]">
          ตรวจรางวัล
        </Button>
      </div>
      <div className="grid grid-cols-4 mt-6">
        <div className="flex flex-col">
          <div className="font-semibold text-sm">รางวัล 1</div>
          <div className="font-bold text-lg">{reward.first}</div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-sm">เลขท้าย 3 ตัว</div>
          <div className="font-bold text-lg">{reward.last3b}</div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-sm">เลขหน้า 3 ตัว</div>
          <div className="font-bold text-lg">{reward.last3f}</div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-sm">เลขท้าย 2 ตัว</div>
          <div className="font-bold text-lg">{reward.last2}</div>
        </div>
      </div>
    </div>
  );
}
