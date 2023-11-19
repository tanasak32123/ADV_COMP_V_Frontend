import { Button } from "@/components/ui/button";
import { getLotteryData } from "@/service/lottery/lottery.service";
import React from "react";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import AwardResult from "./components/AwardResult";

async function getLottery() {
  const data = await getLotteryData();
  return data;
}

export default async function Home() {
  const lottery = await getLottery();

  return (
    <div className="relative px-10 min-h-[90dvh]">
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
            <Button className="bg-[#618FD8] font-bold mt-4 rounded-[25px] min-w-[120px]">
              Get Start
            </Button>

            <AwardResult lottery={lottery} />
          </div>
        </div>

        <div className="flex items-center justify-center pb-16 pt-12">
          <div className="w-[50%] bg-[#7AA7EE] lg:p-20 p-14 rounded-full">
            <FaCircleDollarToSlot className="w-full h-auto text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
