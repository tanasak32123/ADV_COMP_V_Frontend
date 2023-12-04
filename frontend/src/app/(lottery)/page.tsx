import React from "react";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import AwardResult from "./components/AwardResult";
import { IRewardLottery, ResultResponse } from "@/interface/lottery/lottery.interface";
import apiReward from "@/utils/apiReward";
import GetStartedBtn from "./components/GetStartedBtn";
import AnnouncementDealerDialog from "./components/dialog/AnnouncementDealerDialog";

export default async function Home() {
  const response = await apiReward() as ResultResponse;

  const reward: IRewardLottery = {
    first: response.response.data.first.number[0].value,
    last3f_1: response.response.data.last3f.number[0].value,
    last3f_2: response.response.data.last3f.number[1].value,
    last3b_1: response.response.data.last3b.number[0].value,
    last3b_2: response.response.data.last3b.number[1].value,
    last2: response.response.data.last2.number[0].value,
    day: response.response.displayDate.date,
    month: response.response.displayDate.month,
    year: response.response.displayDate.year
  };

  return (
    <div className="relative px-10 min-h-[85dvh] bg-[#36517C]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center lg:pl-10 pe-0 pt-10">
          <div className="text-white">
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
              Welcome to ชื่อแอปไรสักอย่าง
            </h1>
            <p className="leading-7 text-xs mt-2">
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <GetStartedBtn />

            <AwardResult reward={reward} />
          </div>
        </div>

        <div className="flex items-center justify-center pb-16 pt-12">
          <div className="w-[50%] bg-[#7AA7EE] lg:p-20 p-14 rounded-full">
            <FaCircleDollarToSlot className="w-full h-auto text-white" />
          </div>
        </div>
      </div>

      <AnnouncementDealerDialog />
    </div>
  );
}
